import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWalletComponent } from './check-wallet.component';

describe('CheckWalletComponent', () => {
  let component: CheckWalletComponent;
  let fixture: ComponentFixture<CheckWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
