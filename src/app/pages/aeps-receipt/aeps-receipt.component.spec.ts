import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepsReceiptComponent } from './aeps-receipt.component';

describe('AepsReceiptComponent', () => {
  let component: AepsReceiptComponent;
  let fixture: ComponentFixture<AepsReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepsReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepsReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
