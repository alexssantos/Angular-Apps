import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Progress } from 'src/app/services/progress.service';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import * as $ from 'jquery'
import { UPLOAD_STATUS } from 'src/app/utils/enums/enums';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

	@ViewChild('closeModal', null) closeModalBtn: ElementRef;

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

		let fakeIntervalProgressBar = interval(500);
		fakeIntervalProgressBar
			.pipe(takeWhile(() =>
				(this.uploadPercent < 100)
				&&
				(this.statusUpload === UPLOAD_STATUS.ANDAMENTO)))
			.subscribe(() => {
				console.log('UPLOAD PERCENT FAKE: ', this.uploadPercent + " %");
				this.uploadPercent = (this.uploadPercent >= 100) ? 100 : this.uploadPercent + 5;
			});

		let uploadLapMs = 1000; //1s
		let uploadTrackingObsv = interval(uploadLapMs);
		var uploadingInProgress = true;
		uploadTrackingObsv
			// takeWhile: rxjs 6.4+ //takeUntil causing inter subscribe leaks
			.pipe(takeWhile(() => uploadingInProgress))
			.subscribe(
				(value) => {
					console.log(this.progress);
					this.statusUpload = UPLOAD_STATUS.ANDAMENTO;

					if ((this.progress.status == UPLOAD_STATUS.CONCLUIDO)
						|| (this.progress.status == UPLOAD_STATUS.ERRO)) {
						console.log('STOPED UPLOAD TRAKING!');

						this.statusUpload = UPLOAD_STATUS.CONCLUIDO;
						this.closeModal();

						uploadingInProgress = false;
					}
				},
				((error) => {
					console.error('something is wrong:', error);
				}),
				() => {
					console.log('Finnaly - stop tacking upload');
				});
	}

	private closeModal() {
		setTimeout(() => {
			this.closeModalNow();
			this.resetModalAddPost();
		}, 2000);
	}

	private closeModalNow(): void {
		this.closeModalBtn.nativeElement.click();
		this.resetModalAddPost();
	}

	private resetModalAddPost(): void {
		console.log('reset moral values')
		this.photo = null;
		this.statusUpload = UPLOAD_STATUS.PENDENTE;
		this.uploadPercent = 0;
		this.formPost.reset();
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