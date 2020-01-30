import * as firebase from 'firebase'
import { Progress } from '../models/progress.model';

export class Db {

	constructor(
		private progress: Progress
	){ }

	private dbDocs = DATA_DOCS;
	private dbStorage = DATA_STORAGE;

	public craetePost(post: any): void {

		console.log(post);
		let ImageName = Date.now();

		firebase.storage().ref().child(`${this.dbStorage.IMAGES}/${ImageName}`)
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
				//complete
				() => {
					this.progress.status = 'concluido';
				})
				


		// firebase.database().ref(`${this.docs.POSTS}/${btoa(post.email)}`).push({
		// 	title: post.title
		// })


	}
}

export enum DATA_DOCS {
	POSTS = "posts",
	USER_DETAIL = "user_detail"
}

export enum DATA_STORAGE {
	IMAGES = "images",
	
}