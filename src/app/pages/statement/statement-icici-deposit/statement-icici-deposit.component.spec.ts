import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementIciciDepositComponent } from './statement-icici-deposit.component';

describe('StatementIciciDepositComponent', () => {
  let component: StatementIciciDepositComponent;
  let fixture: ComponentFixture<StatementIciciDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementIciciDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementIciciDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
