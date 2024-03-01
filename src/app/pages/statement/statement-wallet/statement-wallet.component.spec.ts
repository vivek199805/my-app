import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementWalletComponent } from './statement-wallet.component';

describe('StatementWalletComponent', () => {
  let component: StatementWalletComponent;
  let fixture: ComponentFixture<StatementWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
