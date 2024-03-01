import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationBankComponent } from './verification-bank.component';

describe('VerificationBankComponent', () => {
  let component: VerificationBankComponent;
  let fixture: ComponentFixture<VerificationBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
