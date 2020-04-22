import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompareComponent } from './user-compare.component';

describe('UserCompareComponent', () => {
	let component: UserCompareComponent;
	let fixture: ComponentFixture<UserCompareComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserCompareComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserCompareComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
