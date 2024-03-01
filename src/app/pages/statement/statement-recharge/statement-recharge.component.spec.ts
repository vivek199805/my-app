import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementRechargeComponent } from './statement-recharge.component';

describe('StatementRechargeComponent', () => {
  let component: StatementRechargeComponent;
  let fixture: ComponentFixture<StatementRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
