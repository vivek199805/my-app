import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaytmWalletComponent } from './edit-paytm-wallet.component';

describe('EditPaytmWalletComponent', () => {
  let component: EditPaytmWalletComponent;
  let fixture: ComponentFixture<EditPaytmWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaytmWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaytmWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
