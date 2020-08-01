import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-form1',
	templateUrl: './form1.component.html',
	styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

	//METHOD: TEMPLATE FORM (ngForm)
	//@ViewChild('form2') meuFormulario: NgForm;

	/* FormControl(A, B, C)
		A - Valor inicial do Campo.
		B - Array de Validadores (https://angular.io/api/forms/validators)
		C - Array de Validadores Assincronos
	*/
	public formulario3: FormGroup = new FormGroup({
		"firstName": 	new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"lastName": 	new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"userName": 	new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"city": 		new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"state": 		new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"zip": 			new FormControl(null, 
			[Validators.required, Validators.minLength(1)]),
		"formCbx": 		new FormControl(null, 
			[Validators.required]),
	})

	constructor(private changeDetectorRef: ChangeDetectorRef) { }

	ngOnInit(): void {
		this.oldSubmitHandler();
	}

	ngAfterViewInit(): void {				
		//FIX: erro ExpressionChangedAfterItHasBeenCheckedError 
		this.changeDetectorRef.detectChanges();		
	}

	private oldSubmitHandler(): void {
		let formId = 'form1';
		window.addEventListener("load", function () {
			document.getElementById(formId).addEventListener("submit", function (e) {
				e.preventDefault(); // before the code
				/* do what you want with the form */
				
				var form = document.forms[formId];
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

	public submitForm(form: NgForm): void {
		console.log(form.value);
	}

	public printFormGroup(): void {
		console.log(this.formulario3.value);
		console.log(this.formulario3);
	}
}
