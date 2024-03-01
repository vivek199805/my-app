import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAadharpayComponent } from './statement-aadharpay.component';

describe('StatementAadharpayComponent', () => {
  let component: StatementAadharpayComponent;
  let fixture: ComponentFixture<StatementAadharpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementAadharpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementAadharpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
