import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAepsComponent } from './statement-aeps.component';

describe('StatementAepsComponent', () => {
  let component: StatementAepsComponent;
  let fixture: ComponentFixture<StatementAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
