import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharPayReceiptComponent } from './aadhar-pay-receipt.component';

describe('AadharPayReceiptComponent', () => {
  let component: AadharPayReceiptComponent;
  let fixture: ComponentFixture<AadharPayReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadharPayReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadharPayReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
