import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	private dataPost: any

	constructor(
		private db: Db,
	) { }

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			if ((user !== null) && (user.email)) {
				this.updateTimeline(user.email);
			}
		});
	}

	private updateTimeline(email: string): void {
		this.db.GetPosts(email)
			.then((data) => {
				this.dataPost = data;
				console.log('Datapost: ', this.dataPost);
			})
	}

}
