import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AccessComponent } from "./access/access.component";
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
	{ path: "", component: AccessComponent },
	{ path: "home", component: HomeComponent, canActivate: [AuthGuardService] }
];

/*ROUTER SAMPLE
const routes: Routes = [
	{ path: 'home', 		component: HomeComponent },
	{ path: 'about', 		component: AboutComponent },
	{ path: 'privacy', 	component: PrivacyComponent },
	{ path: 'terms', 		component: TermsComponent },
	{ path: '', 			redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', 		component: PageNotFoundComponent }
];
*/

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
