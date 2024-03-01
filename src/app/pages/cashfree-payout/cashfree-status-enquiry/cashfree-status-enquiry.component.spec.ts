import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfreeStatusEnquiryComponent } from './cashfree-status-enquiry.component';

describe('CashfreeStatusEnquiryComponent', () => {
  let component: CashfreeStatusEnquiryComponent;
  let fixture: ComponentFixture<CashfreeStatusEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashfreeStatusEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashfreeStatusEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
