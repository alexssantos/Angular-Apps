import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Form1Component } from './pages/_forms/form1/form1.component';
import { Sidenav1Component } from './pages/_sidenave/sidenav1/sidenav1.component';


const routes: Routes = [	
	{ path: 'home', component: HomeComponent },
	{ path: 'forms', component: Form1Component },
	{ path: 'sidenavs', component: Sidenav1Component },		
	{
		path: '', redirectTo: '/home', pathMatch: 'full'
	},	
	{
		//entra NotFoundCOmponent
		path: '**', redirectTo: "/home"
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
