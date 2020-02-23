import * as firebase from 'firebase';
import { Progress } from './progress.service';
import { Injectable } from '@angular/core';
import { UPLOAD_STATUS } from 'src/app/utils/enums/enums';


@Injectable()
export class Db {
	private DATA_DOCS = {
		POSTS: 'posts',
		USER_DETAIL: 'user_detail'
	};

	private DATA_STORAGE = {
		IMAGES: 'images'
	};

	constructor(
		private progress: Progress
	) {	}

	public craetePost(post: any): void {

		console.log('createPost - post:', post);
		const post_key = btoa(post.email);
		const image_url = Date.now().toString() + post_key;

		//post
		firebase.database()
			.ref(`${this.DATA_DOCS.POSTS}/${post_key}`)
			.push({
				title: post.title,
				image_url: image_url
			})
			.then((ref) => {
				console.log("Document successfully written!", ref);
				this.uploadPhoto(post.image, image_url);
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
	}

	private uploadPhoto(imageBlob: File, imageUrl: string): void {

		firebase.storage().ref().child(`${this.DATA_STORAGE.IMAGES}/${imageUrl}`)
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
}