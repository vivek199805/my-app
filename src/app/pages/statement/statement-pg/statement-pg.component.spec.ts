import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementPgComponent } from './statement-pg.component';

describe('StatementPgComponent', () => {
  let component: StatementPgComponent;
  let fixture: ComponentFixture<StatementPgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementPgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
