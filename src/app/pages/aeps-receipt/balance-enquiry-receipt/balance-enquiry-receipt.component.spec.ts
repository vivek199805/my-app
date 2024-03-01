import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceEnquiryReceiptComponent } from './balance-enquiry-receipt.component';

describe('BalanceEnquiryReceiptComponent', () => {
  let component: BalanceEnquiryReceiptComponent;
  let fixture: ComponentFixture<BalanceEnquiryReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceEnquiryReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceEnquiryReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
