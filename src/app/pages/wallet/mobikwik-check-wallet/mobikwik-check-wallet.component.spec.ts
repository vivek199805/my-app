import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobikwikCheckWalletComponent } from './mobikwik-check-wallet.component';

describe('MobikwikCheckWalletComponent', () => {
  let component: MobikwikCheckWalletComponent;
  let fixture: ComponentFixture<MobikwikCheckWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobikwikCheckWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobikwikCheckWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
