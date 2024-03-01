import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMobikwikWalletComponent } from './edit-mobikwik-wallet.component';

describe('EditMobikwikWalletComponent', () => {
  let component: EditMobikwikWalletComponent;
  let fixture: ComponentFixture<EditMobikwikWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMobikwikWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMobikwikWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
