import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillpaycommComponent } from './billpaycomm.component';

describe('BillpaycommComponent', () => {
  let component: BillpaycommComponent;
  let fixture: ComponentFixture<BillpaycommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillpaycommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillpaycommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
