import * as firebase from 'firebase';
import { Progress } from './progress.service';
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

	constructor(
		private progress: Progress
	) { }


	public craetePost(post: any): void {

		console.log('craetePost - post:', post);
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
					//console.log("SUCESSO NA REQUISIÇÂO")

				},
				(error) => {
					this.progress.status = 'erro';
					console.log("ERRO NA REQUISIÇÂO")
				},
				// complete
				() => {
					this.progress.status = 'concluido';
					console.log("CONCLUIDO A REQUISIÇÂO")
				});

		firebase.database().ref(`${this.DATA_DOCS.POSTS}/${btoa(post.email)}`).push({
			title: post.title
		});
	}
}