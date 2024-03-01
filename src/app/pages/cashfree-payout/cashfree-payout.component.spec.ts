import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfreePayoutComponent } from './cashfree-payout.component';

describe('CashfreePayoutComponent', () => {
  let component: CashfreePayoutComponent;
  let fixture: ComponentFixture<CashfreePayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashfreePayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashfreePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
