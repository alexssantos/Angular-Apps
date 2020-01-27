import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';

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

	constructor(private db: Db) { }

	ngOnInit() {
		this.startTrackingUserState()
	}

	public createPost(): void {
		console.log(this.formPost.value.title);
		this.db.craetePost({
			email: this.userEmail,
			title: this.formPost.value.title
		});
	}

	private startTrackingUserState(): void {
		firebase.auth().onAuthStateChanged((user) => {
			this.userEmail = user.email;
		});
	}

	private changeInput(event: Event) {
		let files: any = (<HTMLInputElement>event.target).files;
		let file = files && files.length > 0 ? files[0] : null;
		this.photo = file;
	}

}
