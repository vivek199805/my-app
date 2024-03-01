import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashWithdrawalReceiptComponent } from './cash-withdrawal-receipt.component';

describe('CashWithdrawalReceiptComponent', () => {
  let component: CashWithdrawalReceiptComponent;
  let fixture: ComponentFixture<CashWithdrawalReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashWithdrawalReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashWithdrawalReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
