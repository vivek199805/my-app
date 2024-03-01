import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmWalletComponent } from './paytm-wallet.component';

describe('PaytmWalletComponent', () => {
  let component: PaytmWalletComponent;
  let fixture: ComponentFixture<PaytmWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaytmWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
