import { Component, OnInit } from '@angular/core';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	private userEmail: string;

	constructor(
		private db: Db,
	) { }

	ngOnInit() {
		firebase.auth().onAuthStateChanged((user) => {
			this.userEmail = user.email;

			this.updateTimeline();
		});
	}

	private updateTimeline(): void {
		this.db.GetPosts(this.userEmail);
	}

}
