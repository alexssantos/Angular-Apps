import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

//PAGES
import { AppComponent } from "./app.component";
import { AccessComponent } from "./access/access.component";
import { BannerComponent } from "./access/banner/banner.component";
import { LoginComponent } from "./access/login/login.component";
import { SignUpComponent } from "./access/sign-up/sign-up.component";
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './home/posts/posts.component';
import { AddPostComponent } from './home/add-post/add-post.component';

// Services
import { MyAuthService } from './services/my-auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { Db } from './services/db.service';
import { Progress } from './services/progress.service';

@NgModule({
	declarations: [
		AppComponent,
		AccessComponent,
		BannerComponent,
		LoginComponent,
		SignUpComponent,
		HomeComponent,
		PostsComponent,
		AddPostComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule
	],
	providers: [
		MyAuthService,
		AuthGuardService,
		Db,
		Progress
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
