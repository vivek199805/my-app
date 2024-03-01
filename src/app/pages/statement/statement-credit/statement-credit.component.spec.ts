import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementCreditComponent } from './statement-credit.component';

describe('StatementCreditComponent', () => {
  let component: StatementCreditComponent;
  let fixture: ComponentFixture<StatementCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
