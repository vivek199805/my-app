import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutprocessComponent } from './payoutprocess.component';

describe('PayoutprocessComponent', () => {
  let component: PayoutprocessComponent;
  let fixture: ComponentFixture<PayoutprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutprocessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
