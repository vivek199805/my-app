import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDmtComponent } from './statement-dmt.component';

describe('StatementDmtComponent', () => {
  let component: StatementDmtComponent;
  let fixture: ComponentFixture<StatementDmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
