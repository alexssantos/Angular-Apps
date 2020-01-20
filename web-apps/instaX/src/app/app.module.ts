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
import { MyAuthService } from "./services/my-auth.service";

@NgModule({
	declarations: [
		AppComponent,
		AccessComponent,
		BannerComponent,
		LoginComponent,
		SignUpComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule
	],
	providers: [
		MyAuthService
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
