import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMobikwikWalletComponent } from './create-mobikwik-wallet.component';

describe('CreateMobikwikWalletComponent', () => {
  let component: CreateMobikwikWalletComponent;
  let fixture: ComponentFixture<CreateMobikwikWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMobikwikWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMobikwikWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
