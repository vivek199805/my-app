import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMobikwikWalletComponent } from './list-mobikwik-wallet.component';

describe('ListMobikwikWalletComponent', () => {
  let component: ListMobikwikWalletComponent;
  let fixture: ComponentFixture<ListMobikwikWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMobikwikWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMobikwikWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
