import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutqueryComponent } from './payoutquery.component';

describe('PayoutqueryComponent', () => {
  let component: PayoutqueryComponent;
  let fixture: ComponentFixture<PayoutqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
