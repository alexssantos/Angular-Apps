import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-form1',
	templateUrl: './form1.component.html',
	styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

	//@ViewChild('form2') meuFormulario: NgForm;

	constructor() { }

	ngOnInit(): void {
		this.oldSubmitHandler();
	}

	private oldSubmitHandler(): void {
		window.addEventListener("load", function () {
			document.getElementById('form1').addEventListener("submit", function (e) {
				e.preventDefault(); // before the code
				/* do what you want with the form */
				
				var form = document.forms['form1'];
				console.log(form.elements);

				for (var i = 0; i < form.elements.length; i++) {
					var element = form.elements[i];
					console.log(element.value);
				}
				
				// Should be triggered on form submit
				alert('hi');
			});
		});
	}

	public submitForm2(form: NgForm): void {
		console.log(form.value);
	}
}
