import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentGatewayComponent } from './list-payment-gateway.component';

describe('ListPaymentGatewayComponent', () => {
  let component: ListPaymentGatewayComponent;
  let fixture: ComponentFixture<ListPaymentGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymentGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
