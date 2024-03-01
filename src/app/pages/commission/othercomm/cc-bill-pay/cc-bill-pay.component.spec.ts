import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcBillPayComponent } from './cc-bill-pay.component';

describe('CcBillPayComponent', () => {
  let component: CcBillPayComponent;
  let fixture: ComponentFixture<CcBillPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcBillPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcBillPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
