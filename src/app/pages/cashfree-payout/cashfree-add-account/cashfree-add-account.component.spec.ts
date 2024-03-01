import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfreeAddAccountComponent } from './cashfree-add-account.component';

describe('CashfreeAddAccountComponent', () => {
  let component: CashfreeAddAccountComponent;
  let fixture: ComponentFixture<CashfreeAddAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashfreeAddAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashfreeAddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
