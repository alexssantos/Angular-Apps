import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Progress } from 'src/app/models/progress.model';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

	public formPost: FormGroup = new FormGroup({
		title: new FormControl()
	});

	private userEmail: string;
	private photo: any;

	constructor(
		private db: Db,
		private progress: Progress
	) 
	{ }

	ngOnInit() {
		this.startTrackingUserState()
	}

	public createPost(): void {
		console.log(this.formPost.value.title);
		this.db.craetePost({
			email: this.userEmail,
			title: this.formPost.value.title,
			image: this.photo[0]
		});

		console.log(this.progress.state);
		console.log(this.progress.status);
	}

	private startTrackingUserState(): void {
		firebase.auth().onAuthStateChanged((user) => {
			this.userEmail = user.email;
		});
	}

	private getImageFile(event: Event) {
		let files: any = (<HTMLInputElement>event.target).files;
		let file = files && files.length > 0 ? files[0] : null;
		this.photo = file;
	}

}
