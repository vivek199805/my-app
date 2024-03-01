import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeHandlerComponent } from './recharge-handler.component';

describe('RechargeHandlerComponent', () => {
  let component: RechargeHandlerComponent;
  let fixture: ComponentFixture<RechargeHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
