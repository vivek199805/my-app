import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionEarningComponent } from './commission-earning.component';

describe('CommissionEarningComponent', () => {
  let component: CommissionEarningComponent;
  let fixture: ComponentFixture<CommissionEarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionEarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
