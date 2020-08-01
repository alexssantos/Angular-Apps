import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { UserCompareComponent } from './pages/user-compare/user-compare.component';
import { HallOfFameComponent } from './pages/hall-of-fame/hall-of-fame.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AccessComponent } from './pages/access/access.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
	{ path: 'access', component: AccessComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'notfound', component: PageNotFoundComponent },
	{ path: 'profile/:id', component: UserDetailsComponent },
	{
		path: 'profile', redirectTo: 'compare', pathMatch: 'full'
	},
	{ path: 'project', component: ProjectDetailsComponent },
	{ path: 'compare', component: UserCompareComponent },
	{ path: 'hall', component: HallOfFameComponent },
	{
		path: '', redirectTo: '/access', pathMatch: 'full'
	},	
	{
		//entra NotFoundCOmponent
		path: '**', redirectTo: "/notfound"
	}
];

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule],
})
export class AppRoutingModule { }

/*
> Exemplo:
For instance =>  ['/team', teamId, 'user', userName, {details: true}] => '/team/11/user/bob;details=true'

Multiple static segments can be merged into one (e.g., ['/team/11/user', userName, {details: true}]).

<a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
	link to user component
</a>
*/