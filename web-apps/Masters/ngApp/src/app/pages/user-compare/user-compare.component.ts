import { Component, OnInit } from '@angular/core';
import { CardUserModel } from 'src/app/models/card-user.model';
import { MathUtils } from '../../utils/math.utils'
import * as faker from "faker/locale/pt_BR"
import { UserScore } from 'src/app/models/user-score.model';
import { UserService } from 'src/app/services/user.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-user-compare',
	templateUrl: './user-compare.component.html',
	styleUrls: ['./user-compare.component.scss']
})
export class UserCompareComponent implements OnInit {

	public MAX_AMOUNT_CARDS = 13;
	public cardUserList: Array<CardUserModel> = [];

	constructor(
		private userService: UserService
	) {
		this.getUserCards();
	}

	ngOnInit() {
	}

	public buildUserCard(user: UserScore): CardUserModel {
		let cardUser: CardUserModel = {
			id: user.id,
			name: user.name,
			imgUrl: user.photoUrl,
			valueLeft: user.scoreKpis[0].score,
			valueMiddle: user.scoreKpis[1].score,
			valueRight: user.scoreKpis[2].score,
		};

		return cardUser;
	}
	
	public getUserCards(): void {
		this.userService.getRankingList().subscribe(
			(users) => {					
				let userScoreList: UserScore[] = users.map((user) => Object.assign( new UserScore(), user));
				for (let i = 0; i < userScoreList.length; i++) {		
					let userCard = this.buildUserCard(userScoreList[i]);
					this.cardUserList.push(userCard);
				}		
			}, 
			(error) => {
				console.error(error);				
			});
	}	
}


/*
>> DOCS:
https://github.com/marak/Faker.js/

>> sample
faker sample: https://imasters.com.br/desenvolvimento/mockando-dados-com-faker-js

>> get avatar
faker.image.imageUrl(400,400,"people");
*/