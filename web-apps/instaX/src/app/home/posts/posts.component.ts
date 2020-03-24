import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	private dataPost: any;
	public userEmail: string;

	constructor(
		private db: Db,
	) { }

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if ((user !== null) && (user.email)) {
				this.userEmail = user.email;
				this.updateTimeline();
			}
		});
	}

	public updateTimeline(email?: string): void {
		email = (email) ? email : this.userEmail;

		this.db.GetPosts(email)
			.then((data) => {
				this.dataPost = data;
				console.log(this.dataPost);
			})
	}

}
