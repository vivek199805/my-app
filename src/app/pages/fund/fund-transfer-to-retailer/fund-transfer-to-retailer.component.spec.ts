import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTransferToRetailerComponent } from './fund-transfer-to-retailer.component';

describe('FundTransferToRetailerComponent', () => {
  let component: FundTransferToRetailerComponent;
  let fixture: ComponentFixture<FundTransferToRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundTransferToRetailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundTransferToRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
