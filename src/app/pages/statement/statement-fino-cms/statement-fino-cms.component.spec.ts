import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementFinoCmsComponent } from './statement-fino-cms.component';

describe('StatementFinoCmsComponent', () => {
  let component: StatementFinoCmsComponent;
  let fixture: ComponentFixture<StatementFinoCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementFinoCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementFinoCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
