import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementPayoutComponent } from './statement-payout.component';

describe('StatementPayoutComponent', () => {
  let component: StatementPayoutComponent;
  let fixture: ComponentFixture<StatementPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
