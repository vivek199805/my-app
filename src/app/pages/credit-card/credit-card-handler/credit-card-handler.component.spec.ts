import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardHandlerComponent } from './credit-card-handler.component';

describe('CreditCardHandlerComponent', () => {
  let component: CreditCardHandlerComponent;
  let fixture: ComponentFixture<CreditCardHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
