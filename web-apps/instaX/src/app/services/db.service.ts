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

	constructor(
		private progress: Progress
	) { }

	public craetePost(post: any): void {

		console.log('createPost - post:', post);
		const post_key = btoa(post.email);
		console.log('Create post key', post_key)
		const image_url = Date.now().toString() + post_key;

		//post
		firebase.database()
			.ref(`${DB_CONSTS.DATA_DOCS.POSTS}/${post_key}`)
			.push({
				title: post.title,
				image_url: image_url
			})
			.then((ref) => {
				console.log("Document successfully written!", ref);

				if (post.image) {
					this.uploadPhoto(post.image, image_url);
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

	public GetPosts(email: string): any {

		const post_key = btoa(email);

		firebase.database()
			.ref(`${DB_CONSTS.DATA_DOCS.POSTS}/${post_key}`)
			.once('value', (snapshot: any) => {
				console.log('Database posts was getted!', snapshot.val());

				snapshot.forEach((child) => {
					console.log('child', child.val())
				});
			});
	}
}