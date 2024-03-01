import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentGatewayComponent } from './edit-payment-gateway.component';

describe('EditPaymentGatewayComponent', () => {
  let component: EditPaymentGatewayComponent;
  let fixture: ComponentFixture<EditPaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
