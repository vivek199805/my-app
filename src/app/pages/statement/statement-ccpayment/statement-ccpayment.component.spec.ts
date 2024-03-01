import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementCcpaymentComponent } from './statement-ccpayment.component';

describe('StatementCcpaymentComponent', () => {
  let component: StatementCcpaymentComponent;
  let fixture: ComponentFixture<StatementCcpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementCcpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementCcpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
