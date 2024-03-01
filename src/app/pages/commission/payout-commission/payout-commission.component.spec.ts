import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutCommissionComponent } from './payout-commission.component';

describe('PayoutCommissionComponent', () => {
  let component: PayoutCommissionComponent;
  let fixture: ComponentFixture<PayoutCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
