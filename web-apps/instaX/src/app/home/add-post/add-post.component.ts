import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Db } from 'src/app/services/db.service';
import * as firebase from 'firebase';
import { Progress } from 'src/app/services/progress.service';
import { Subject, interval } from 'rxjs';
import { takeWhile, delay } from 'rxjs/operators';

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

	private uploadLapMs = 1000;
	//cada 500ms = +5%
	private uploadSpeed: number = 500;
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
		// this.db.craetePost({
		// 	email: this.userEmail,
		// 	title: this.formPost.value.title,
		// 	image: this.photo
		// });

		//fake upload
		this.fakeUpload();

		this.trackProgressUpload();
	}

	private closeModal() {
		setTimeout(() => {
			this.closeModalBtn.nativeElement.click();

			delay(1000);
			this.resetModalAddPost();
		}, 1500);
	}

	fakeUpload() {
		this.progress.state = {
			uploadedBytes: 0,
			totalBytes: this.photo.size
		};

		let fakeUploadInterval = interval(1000);
		fakeUploadInterval
			.pipe(takeWhile(() => this.progress.state.uploadedBytes < this.photo.size))
			.subscribe(() => {
				let alreadyUploaded = this.progress.state.uploadedBytes;
				let plus = this.get5To10Perc(alreadyUploaded)
				let uploaded = plus + alreadyUploaded;
				console.log('old: ', alreadyUploaded)
				console.log('plus: ', plus)
				console.log('UPLOADED (FAKE) in +1s: ', uploaded)


				this.progress.state.uploadedBytes = uploaded;
				this.progress.status = UPLOAD_STATUS.ANDAMENTO;
			});
	}

	private get5To10Perc(value: number): number {
		console.log('value', value)
		let min = (this.photo.size / 20);
		if (!value || value == 0) {
			return min;
		}
		else {
			let max = min * 2;
			var result = Math.round(Math.random() * (max - min) + min);
			console.log('get5To10Perc :', result);
		}

		return result;
	}

	private trackProgressUpload(): void {

		var uploadingInProgress = true;
		let i = 0;
		let timesUpdateSpeedUpload = 3
		let totalLastUploaded = 0

		let uploadTrackingObsv = interval(this.uploadLapMs);
		uploadTrackingObsv
			// takeWhile: rxjs 6.4+ //takeUntil causing inter subscribe leaks
			.pipe(takeWhile(() => uploadingInProgress))
			.subscribe(() => {
				this.statusUpload = UPLOAD_STATUS.ANDAMENTO;

				let uploaded = this.progress.state.uploadedBytes;
				let diffUpload = uploaded - totalLastUploaded;
				totalLastUploaded = uploaded;

				if (i < timesUpdateSpeedUpload) {
					this.calculateVelocidadeUpload(this.uploadLapMs, diffUpload);
					i++;
				}

				if (this.progress.status == UPLOAD_STATUS.CONCLUIDO) {
					console.log('STOPED UPLOAD TRAKING');
					console.log(this.progress.state);

					this.statusUpload = UPLOAD_STATUS.CONCLUIDO;
					this.closeModal();

					uploadingInProgress = false;
				}
			});


		// === atualiza barra de progresso com base em calc de vel media
		let lap = 0;
		let lastTime = new Date().getMilliseconds();
		let uploadPercentBarSubs = interval(this.uploadSpeed);
		uploadPercentBarSubs
			.pipe(takeWhile(() => this.uploadPercent < 100))
			.subscribe(() => {
				let now = new Date().getMilliseconds();
				let lapTime = Math.abs(now - lastTime);
				lastTime = now;

				let curPercUploaded = Math.round((this.progress.state.uploadedBytes / this.progress.state.totalBytes) * 100);
				let diffProgressPerc = Math.abs(curPercUploaded - this.uploadPercent);
				this.uploadPercent = (curPercUploaded >= 100) ? 100 : curPercUploaded;

				console.log(`
	============= BAR PROGRESS - CALC UPLOAD =======================
		speed: ${this.uploadSpeed} bytes/ms
		lap: ${lap}
		lapTime: +${lapTime} ms
		curPercUploaded: ${diffProgressPerc} %

		----
		totalBytesUploaded: ${this.progress.state.uploadedBytes}
		toalPercUploaded: ${curPercUploaded}
	================================================================
					`);
				lap++;
			});
	}

	calculateVelocidadeUpload(lapTime, bytesUploaded) {
		let curMedia = bytesUploaded / lapTime;

		console.log('laptime: ', lapTime)
		console.log('bytesUploaded', bytesUploaded)
		console.log('curMedia', curMedia)
		console.log('old speed', this.uploadSpeed)

		this.uploadSpeed = ((this.uploadSpeed + curMedia) / 2)
		console.log('UPDATED SPEED TO: ', this.uploadSpeed);
	}

	private resetModalAddPost(): void {
		this.photo = null;
		this.statusUpload = UPLOAD_STATUS.PENDENTE;
		this.uploadPercent = 0;
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
