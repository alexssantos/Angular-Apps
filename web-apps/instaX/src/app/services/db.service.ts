import * as firebase from 'firebase'

export class Db {

	private docs = DATA_DOCS;

	public craetePost(post: any): void {

		console.log(post);

		firebase.database().ref(`${this.docs.POSTS}/${btoa(post.email)}`).push({
			title: post.title
		})


	}
}

export enum DATA_DOCS {
	POSTS = "posts",
	USER_DETAIL = "user_detail"
}