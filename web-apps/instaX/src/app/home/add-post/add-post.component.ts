import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Progress } from 'src/app/services/progress.service';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

	public formPost: FormGroup = new FormGroup({
		title: new FormControl()
	});

	private statusUpload: string;
	private userEmail: string;
	private photo: any;

	constructor(
		private db: Db,
		private progress: Progress
	) { }

	ngOnInit() {
		this.startTrackingUserState();
	}

	public createPost(): void {
		console.log('Form Post', this.formPost);

		this.db.craetePost({
			email: this.userEmail,
			title: this.formPost.value.title,
			image: this.photo
		});

		this.trackProgressUpload();
	}

	private trackProgressUpload(): void {

		let uploadLapMs = 1500;
		let uploadTrackingObsv = interval(uploadLapMs);

		var uploadingInProgress = true;
		uploadTrackingObsv
			// takeWhile: rxjs 6.4+ //takeUntil causing inter subscribe leaks
			.pipe(takeWhile(() => uploadingInProgress))
			.subscribe(() => {
				console.log(this.progress.state);
				console.log(this.progress.status);

				if (this.progress.status == 'concluido') {
					console.log('STOPED UPLOAD TRAKING');
					uploadingInProgress = false;
				}
			})
	}

	private startTrackingUserState(): void {
		firebase.auth().onAuthStateChanged((user) => {
			this.userEmail = user.email;
		});
	}

	private getImageFile(event: Event) {
		let files: any = (event.target as HTMLInputElement).files;
		let file = files && files.length > 0 ? files[0] : null;
		this.photo = file;
		console.log('FOTO: ', this.photo);
	}

}
