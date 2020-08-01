import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RankingListComponent } from './ranking-list/ranking-list.component';
import { Kpi } from 'src/app/models/kpi.model';
import { UserScore } from 'src/app/models/user-score.model';
import { UserTopChampion } from 'src/app/models/user-top-champion.model';
import { Observable } from 'rxjs';
import { ContantsUtils } from 'src/app/utils/contants.utils';


const AWARD_IMG_1 = '../../assets/icons/awards/coroa.svg';
const AWARD_IMG_2 = '../../assets/icons/awards/calice.svg';
const AWARD_IMG_3 = '../../assets/icons/awards/espada.svg';
const PROFILE_PIC_DEFAULT = '../../assets/img/profile_card/default.jpg';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

	public starIcon = '../../assets/icons/star.svg'
	public user_default = PROFILE_PIC_DEFAULT;

	public userTop1: UserTopChampion = new UserTopChampion();
	public userTop2: UserTopChampion = new UserTopChampion();
	public userTop3: UserTopChampion = new UserTopChampion();
	public awardImg1 = AWARD_IMG_1;
	public awardImg2 = AWARD_IMG_2;
	public awardImg3 = AWARD_IMG_3;

	public colorGreenUp = "rgb(68, 234, 95)";
	public colorRedDown = "red";

	@ViewChild("rankingListTag") rankingList: RankingListComponent;

	constructor() {
		this.userTop1.isUpdating = true;
		this.userTop2.isUpdating = true;
		this.userTop3.isUpdating = true;

		//TODO: TESTAR APOS BUILD SE PATH NO SCSS NAO QUEBROU PELA REFERENCIA USADA.
		//this.userTop1.photoUrl = this.user_default
		//this.userTop2.photoUrl = this.user_default
		//this.userTop3.photoUrl = this.user_default
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {

	}

	public getPointsPercentStr(pontos: number): string {
		return ((pontos / 1000) * 100) + '%';
	}

	public viewProfile(): void {

	}

	changeKpi(kpiIndex: number): void {
		this.rankingList.sortRankingListByKpi(kpiIndex);
	}

	public getPhotoOrDefault(photoUrl: any) {
		return (photoUrl) ? photoUrl : this.user_default;
	}
}
