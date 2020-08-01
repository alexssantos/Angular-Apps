//firebase
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

import { Progress } from './progress.service';
import { Injectable } from '@angular/core';
import { UPLOAD_STATUS } from 'src/app/utils/enums/enums';
import { DB_CONSTS } from 'src/app/utils/db.consts';


@Injectable()
export class Db {

	public userDetail: any;

	constructor(
		private progress: Progress
	) { }

	public craetePost(snapshotPost: any): void {

		console.log('createPost - snapshotPost:', snapshotPost);
		const post_key = btoa(snapshotPost.email);
		console.log('Create snapshotPost key', post_key)
		const image_url = Date.now().toString() + post_key;

		//snapshotPost
		firebase.database()
			.ref(`${DB_CONSTS.DATA_DOCS.POSTS}/${post_key}`)
			.push({
				title: snapshotPost.title,
				image_url: image_url
			})
			.then((ref) => {
				console.log("Document successfully written!", ref);

				if (snapshotPost.image) {
					this.uploadPhoto(snapshotPost.image, image_url);
				}
				else {
					this.progress.status = UPLOAD_STATUS.CONCLUIDO;
				}
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	}

	private uploadPhoto(imageBlob: File, imageUrl: string): void {

		firebase.storage().ref().child(`${DB_CONSTS.DATA_STORAGE.IMAGES}/${imageUrl}`)
			// Create blob
			.put(imageBlob)
			// Tracking state.
			.on(firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot: any) => {
					this.progress.state = snapshot;
					this.progress.status = UPLOAD_STATUS.ANDAMENTO;
					console.log(snapshot);
				},
				(error) => {
					console.log("Error uploading photo:", error);
					this.progress.status = UPLOAD_STATUS.ERRO;;
				},
				// complete
				() => {
					console.log("Photo successfully uploaded!");
					this.progress.status = UPLOAD_STATUS.CONCLUIDO;
				});
	}

	public GetPosts(email: string): Promise<any> {

		return new Promise((done, reject) => {

			let result = {
				postList: [],
				userDetail: null
			}

			const post_key = btoa(email);
			firebase.database()
				.ref(`${DB_CONSTS.DATA_DOCS.POSTS}/${post_key}`)
				.orderByKey()
				.once('value')
				.then((snapshot: any) => {

					this.getUserDetails(email)
						.then((userDetail: any) => {
							result.userDetail = userDetail;
						})
						.finally(() => {
							snapshot.forEach((rawPost: any) => {
								let post = rawPost.val();
								this.getUrlPhotoFull(post, result);
							});//foreach							
						});

					console.log(result);
					done(result);
				})
				.catch((error) => console.error(`${error.message}`, error));

		})
	}//func

	public getUserDetails(email: string): Promise<any> {
		let user_detail_key = btoa(email);
		let user_detail_ref = `${DB_CONSTS.DATA_DOCS.USER_DETAIL}/${user_detail_key}`

		return firebase.database().ref(user_detail_ref)
			.once('value')
			.then((snapshot: any) => snapshot.val())
			.catch((error) => console.error(`${error.message}`, error));
	}

	public getUrlPhotoFull(post, result: any): void {
		firebase.storage().ref()
			.child(`${DB_CONSTS.DATA_STORAGE.IMAGES}/${post.image_url}`)
			//pegando a URL (com token) da imagem no storage
			.getDownloadURL()
			.then((full_url) => {

				post.photoUrlFull = full_url;
				result.postList.push(post);
			})
			.catch((error) => console.error(`${error.message}`, error));
	}
}