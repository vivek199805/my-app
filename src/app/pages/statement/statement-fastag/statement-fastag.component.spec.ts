import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementFastagComponent } from './statement-fastag.component';

describe('StatementFastagComponent', () => {
  let component: StatementFastagComponent;
  let fixture: ComponentFixture<StatementFastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementFastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementFastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
