import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaytmWalletComponent } from './create-paytm-wallet.component';

describe('CreatePaytmWalletComponent', () => {
  let component: CreatePaytmWalletComponent;
  let fixture: ComponentFixture<CreatePaytmWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePaytmWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaytmWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
