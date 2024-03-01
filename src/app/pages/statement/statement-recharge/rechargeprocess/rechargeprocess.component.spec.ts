import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeprocessComponent } from './rechargeprocess.component';

describe('RechargeprocessComponent', () => {
  let component: RechargeprocessComponent;
  let fixture: ComponentFixture<RechargeprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargeprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
