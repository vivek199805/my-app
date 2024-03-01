import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitReceivingComponent } from './debit-receiving.component';

describe('DebitReceivingComponent', () => {
  let component: DebitReceivingComponent;
  let fixture: ComponentFixture<DebitReceivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitReceivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitReceivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
