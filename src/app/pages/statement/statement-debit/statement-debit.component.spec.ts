import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDebitComponent } from './statement-debit.component';

describe('StatementDebitComponent', () => {
  let component: StatementDebitComponent;
  let fixture: ComponentFixture<StatementDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
