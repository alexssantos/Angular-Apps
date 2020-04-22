import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserDetails } from 'src/app/models/user-details.model';
import { Router } from '@angular/router';
import { Kpi } from 'src/app/models/kpi.model';


const PROFILE_PIC1 = '../../assets/img/faces/kaci-baum-2.jpg';

@Component({
    selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

    @HostListener("window:resize", [])
    public onResize() {
        this.detectScreenSize();
        console.log('VIew Resize')
	}
	
	public userId: string = "";
	public user: UserDetails = new UserDetails();
	public userKpis: Kpi[] = [];
	public editMode: boolean = false;
	public scoreBoxesLabels = ["TOTAL HELPS", "TOTAL COMMENTS", "TOTAL TASKS DONE", "TOTAL TASKS IN-PROGRESS"];

    public profileImg: string = PROFILE_PIC1;
    public isSmallScreen: boolean = false;
	
	constructor(
		private userService: UserService,
		private router: Router
	) 
	{
		let urlArray = this.router.url.split('/');
		this.userId = urlArray[urlArray.length -1].toLowerCase();			
	}

	ngOnInit() { 
		this.getUserDetails();
	}

    ngAfterViewInit() {
        this.detectScreenSize();
        console.log('After view init')
    }

    private detectScreenSize() {
        let width = window.innerWidth;
        this.isSmallScreen = (width < 900);
	}
	
	public getUserDetails(): void {
		this.userService.getUserDetails(this.userId).subscribe(
			(user: UserDetails) => {
				this.user = Object.assign( new UserDetails(), user)
				this.userKpis = this.user.usersKpis.scoreKpis;
				console.log(this.user)				;
			},
			(error) => {
				console.log(error);
			});
	}

	public saveUserDetails(): void {
		//this.user.id = this.user.userName;

		this.user.usersKpis.name = this.user.firstName + " " + this.user.lastName;
		this.user.usersKpis.nickName = this.user.userName;

		this.userService.updateUserDetails(this.user).subscribe(
			(res) => {
				console.log(res);
			},
			(error) => {
				console.error(error)
			}
		);
	}

	public deleteUser():void {
		//Doletar Login do firebase

	}

	public editInfos(): void {
		this.editMode = !this.editMode;
	}

	teste() {
		console.log(this.user);
	}

}
