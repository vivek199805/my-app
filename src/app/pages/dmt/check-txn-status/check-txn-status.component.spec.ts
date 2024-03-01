import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTxnStatusComponent } from './check-txn-status.component';

describe('CheckTxnStatusComponent', () => {
  let component: CheckTxnStatusComponent;
  let fixture: ComponentFixture<CheckTxnStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTxnStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTxnStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
