import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRechargeComponent } from './edit-recharge.component';

describe('EditRechargeComponent', () => {
  let component: EditRechargeComponent;
  let fixture: ComponentFixture<EditRechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
