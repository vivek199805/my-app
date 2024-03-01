import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRechargeComponent } from './list-recharge.component';

describe('ListRechargeComponent', () => {
  let component: ListRechargeComponent;
  let fixture: ComponentFixture<ListRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
