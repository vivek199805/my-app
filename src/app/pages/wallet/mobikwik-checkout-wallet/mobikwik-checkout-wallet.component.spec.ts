import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobikwikCheckoutWalletComponent } from './mobikwik-checkout-wallet.component';

describe('MobikwikCheckoutWalletComponent', () => {
  let component: MobikwikCheckoutWalletComponent;
  let fixture: ComponentFixture<MobikwikCheckoutWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobikwikCheckoutWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobikwikCheckoutWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
