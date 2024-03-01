import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardQueryComponent } from './credit-card-query.component';

describe('CreditCardQueryComponent', () => {
  let component: CreditCardQueryComponent;
  let fixture: ComponentFixture<CreditCardQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
