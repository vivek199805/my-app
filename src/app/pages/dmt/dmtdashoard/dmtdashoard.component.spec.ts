import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtdashoardComponent } from './dmtdashoard.component';

describe('DmtdashoardComponent', () => {
  let component: DmtdashoardComponent;
  let fixture: ComponentFixture<DmtdashoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmtdashoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtdashoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
