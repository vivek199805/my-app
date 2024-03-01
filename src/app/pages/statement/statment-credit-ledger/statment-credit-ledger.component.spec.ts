import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatmentCreditLedgerComponent } from './statment-credit-ledger.component';

describe('StatmentCreditLedgerComponent', () => {
  let component: StatmentCreditLedgerComponent;
  let fixture: ComponentFixture<StatmentCreditLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatmentCreditLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatmentCreditLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
