import { Kpi } from './kpi.model';

export class UserScore {
	id: string;
	name: string;
	nickName: string;
	lastPosition: number;
	position: number;
	photoUrl: any;
	kpiActiveIndex: number;	
	scoreKpis: Kpi[];

	isChampion() {
		return (this.position < 4);
	}
}