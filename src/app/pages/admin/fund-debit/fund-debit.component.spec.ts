import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDebitComponent } from './fund-debit.component';

describe('FundDebitComponent', () => {
  let component: FundDebitComponent;
  let fixture: ComponentFixture<FundDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
