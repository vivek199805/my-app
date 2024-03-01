import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommLicBillpayComponent } from './comm-lic-billpay.component';

describe('CommLicBillpayComponent', () => {
  let component: CommLicBillpayComponent;
  let fixture: ComponentFixture<CommLicBillpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommLicBillpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommLicBillpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
