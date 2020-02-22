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

	private statusUpload: UPLOAD_STATUS;
	private userEmail: string;
	private photo: any;
	private uploadPercent: number = 0;

	constructor(
		private db: Db,
		private progress: Progress
	) { }

	ngOnInit() {
		this.startTrackingUserState();
		this.statusUpload = UPLOAD_STATUS.PENDENTE;
	}

	public createPost(): void {
		console.log('status upload', this.statusUpload)
		this.statusUpload = UPLOAD_STATUS.ANDAMENTO;
		this.db.craetePost({
			email: this.userEmail,
			title: this.formPost.value.title,
			image: this.photo
		});

		this.trackProgressUpload();
	}

	private trackProgressUpload(): void {

		let uploadLapMs = 1000; //1s
		let uploadTrackingObsv = interval(uploadLapMs);

		var uploadingInProgress = true;
		uploadTrackingObsv
			// takeWhile: rxjs 6.4+ //takeUntil causing inter subscribe leaks
			.pipe(takeWhile(() => uploadingInProgress))
			.subscribe(() => {
				console.log(this.progress.state);
				console.log(this.progress.status);
				this.statusUpload = UPLOAD_STATUS.ANDAMENTO;
				this.uploadPercent = Math.round((this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100);

				if (this.progress.status == 'concluido') {
					console.log('STOPED UPLOAD TRAKING');
					console.log(this.progress.state);

					this.statusUpload = UPLOAD_STATUS.CONCLUIDO;
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

export enum UPLOAD_STATUS {
	CONCLUIDO = 'concluido',
	PENDENTE = 'pendente',
	ANDAMENTO = 'andamento'
}
