import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaymentGatewayComponent } from './create-payment-gateway.component';

describe('CreatePaymentGatewayComponent', () => {
  let component: CreatePaymentGatewayComponent;
  let fixture: ComponentFixture<CreatePaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaymentGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
