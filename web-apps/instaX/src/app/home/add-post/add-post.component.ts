import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Progress } from 'src/app/services/progress.service';
import { Subject, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import * as $ from 'jquery'
import { UPLOAD_STATUS } from 'src/app/utils/enums/enums';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

	@ViewChild('closeModal', null) closeModalBtn: ElementRef;

	public formPost: FormGroup = new FormGroup({
		title: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
		photo: new FormControl(null, Validators.required)
	});

	private statusUpload: UPLOAD_STATUS;
	private userEmail: string;
	private photo: any;
	private photos: any[] = [];
	private uploadPercent: number = 0;

	constructor(
		private db: Db,
		private progress: Progress,
		private myAuth: MyAuthService
	) { }

	ngOnInit() {
		this.startTrackingUserState();
		this.statusUpload = UPLOAD_STATUS.PENDENTE;
	}

	teste() {
		console.log("FORM POST: ", this.formPost);
	}

	public createPost(): void {
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
					this.statusUpload = UPLOAD_STATUS.ANDAMENTO;

					if ((this.progress.status == UPLOAD_STATUS.CONCLUIDO)
						|| (this.progress.status == UPLOAD_STATUS.ERRO)) {

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
		this.photo = null;
		this.photos = [];
		this.statusUpload = UPLOAD_STATUS.PENDENTE;
		this.uploadPercent = 0;
		this.formPost.reset();
	}

	private startTrackingUserState(): void {
		firebase.auth().onAuthStateChanged((user) => {
			if ((user !== null) && (user.email)) {
				this.userEmail = user.email;
			}
			else {
				this.myAuth.logout();
			}
		});
	}

	private getImageFile(event: Event, formImageName: string) {
		let files: any = (event.target as HTMLInputElement).files;
		let file: File = (files && files.length > 0) ? files[0] : null;
		this.photo = file;

		//this.formPost.get(formImageName).setValue(this.photo);

		this.formPost.patchValue({ [formImageName]: file });

		this.preview(files);
	}

	public imagePath;
	imgURL: any;


	preview(files) {
		if (files.length === 0) return;

		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		var reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.photos.push({
				imgURL: reader.result
			});
		}
	}

}