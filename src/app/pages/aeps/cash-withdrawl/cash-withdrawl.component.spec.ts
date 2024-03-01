import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashWithdrawlComponent } from './cash-withdrawl.component';

describe('CashWithdrawlComponent', () => {
  let component: CashWithdrawlComponent;
  let fixture: ComponentFixture<CashWithdrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashWithdrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashWithdrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
