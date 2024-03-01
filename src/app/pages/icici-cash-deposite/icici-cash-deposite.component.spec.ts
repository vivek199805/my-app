import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IciciCashDepositeComponent } from './icici-cash-deposite.component';

describe('IciciCashDepositeComponent', () => {
  let component: IciciCashDepositeComponent;
  let fixture: ComponentFixture<IciciCashDepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IciciCashDepositeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IciciCashDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
