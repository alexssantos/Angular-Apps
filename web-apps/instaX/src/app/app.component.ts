import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
	title = "instaX";

	ngOnInit(): void {
		var firebaseConfig = {
			apiKey: "AIzaSyBaSTu8R8rsIcAIUaPmsHKl4kiONcfGdKw",
			authDomain: "ass-instax-webapp.firebaseapp.com",
			databaseURL: "https://ass-instax-webapp.firebaseio.com",
			projectId: "ass-instax-webapp",
			storageBucket: "ass-instax-webapp.appspot.com",
			messagingSenderId: "894693559197",
			appId: "1:894693559197:web:ffa088b98717fcb1f6bd74",
			measurementId: "G-G2T4844TC3"
		};
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
	}
}
