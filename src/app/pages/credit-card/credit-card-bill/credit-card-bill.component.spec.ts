import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardBillComponent } from './credit-card-bill.component';

describe('CreditCardBillComponent', () => {
  let component: CreditCardBillComponent;
  let fixture: ComponentFixture<CreditCardBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
