import { Injectable } from "@angular/core";
import { UserScore } from '../models/user-score.model';


@Injectable({
	providedIn: "root"
})
export class CollectionsUtils {
	
	//retorna os maioes primeiro.
	public static sortUsersToRankingListDesc(userA:UserScore, userB:UserScore): number {
		
		let kpiA = userA.scoreKpis[userA.kpiActiveIndex].score;
		let kpiB = userB.scoreKpis[userB.kpiActiveIndex].score;		

		// A MAIOR = 1 // B MAIOR = -1
		if (kpiA > kpiB)  return -1;
		if (kpiA < kpiB)  return 1;					
		return 0;		
	}
}