import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletqueryComponent } from './walletquery.component';

describe('WalletqueryComponent', () => {
  let component: WalletqueryComponent;
  let fixture: ComponentFixture<WalletqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
