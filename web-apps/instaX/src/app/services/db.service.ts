import * as firebase from 'firebase';
import { Progress } from '../models/progress.model';
import { Injectable } from '@angular/core';

@Injectable()
export class Db {
	private DATA_DOCS = {
		POSTS: 'posts',
		USER_DETAIL: 'user_detail'
	};

	private DATA_STORAGE = {
		IMAGES: 'images'
	};

	private progress: Progress = new Progress();

	constructor() { }


	public craetePost(post: any): void {

		console.log(post);
		const ImageName = Date.now();

		firebase.storage().ref().child(`${this.DATA_STORAGE.IMAGES}/${ImageName}`)
			// Create blob
			.put(post.image)
			// Tracking state.
			.on(firebase.storage.TaskEvent.STATE_CHANGED,
				(snapshot: any) => {
					this.progress.state = snapshot;
					this.progress.status = 'em andamento';
					console.log(snapshot);

				},
				(error) => {
					this.progress.status = 'erro';
				},
				// complete
				() => {
					this.progress.status = 'concluido';
				});

		firebase.database().ref(`${this.DATA_DOCS.POSTS}/${btoa(post.email)}`).push({
			title: post.title
		});
	}
}