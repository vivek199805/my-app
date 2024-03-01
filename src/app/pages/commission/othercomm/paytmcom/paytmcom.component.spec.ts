import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmcomComponent } from './paytmcom.component';

describe('PaytmcomComponent', () => {
  let component: PaytmcomComponent;
  let fixture: ComponentFixture<PaytmcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaytmcomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
