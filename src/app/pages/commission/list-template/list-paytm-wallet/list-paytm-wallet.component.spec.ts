import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaytmWalletComponent } from './list-paytm-wallet.component';

describe('ListPaytmWalletComponent', () => {
  let component: ListPaytmWalletComponent;
  let fixture: ComponentFixture<ListPaytmWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaytmWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaytmWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
