import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementBillPaymentComponent } from './statement-bill-payment.component';

describe('StatementBillPaymentComponent', () => {
  let component: StatementBillPaymentComponent;
  let fixture: ComponentFixture<StatementBillPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementBillPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementBillPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
