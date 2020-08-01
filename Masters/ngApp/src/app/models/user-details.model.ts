import { UserScore } from './user-score.model';

export class UserDetails {
	
	public id: string;
	public firstName: string;
	public lastName: string;
	public userName: string;
	public email: string;
	public company: string;
	public position: string;
	public address: string[];
	public country: string;
	public state: string;
	public zipCode: string;		
	public photoUrl: string;
	public usersKpis: UserScore;
}
