import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFreePgComponent } from './case-free-pg.component';

describe('CaseFreePgComponent', () => {
  let component: CaseFreePgComponent;
  let fixture: ComponentFixture<CaseFreePgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseFreePgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFreePgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
