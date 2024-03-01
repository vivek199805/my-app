import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOtpComponent } from './custom-otp.component';

describe('CustomOtpComponent', () => {
  let component: CustomOtpComponent;
  let fixture: ComponentFixture<CustomOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomOtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
