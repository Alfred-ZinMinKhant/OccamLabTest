import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationCompletedPopupComponent } from './registration-completed-popup.component';

describe('RegistrationCompletedPopupComponent', () => {
  let component: RegistrationCompletedPopupComponent;
  let fixture: ComponentFixture<RegistrationCompletedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationCompletedPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationCompletedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
