import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatmentDebitLedgerComponent } from './statment-debit-ledger.component';

describe('StatmentDebitLedgerComponent', () => {
  let component: StatmentDebitLedgerComponent;
  let fixture: ComponentFixture<StatmentDebitLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatmentDebitLedgerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatmentDebitLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
