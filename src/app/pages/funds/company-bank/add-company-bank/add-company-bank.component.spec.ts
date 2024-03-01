import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyBankComponent } from './add-company-bank.component';

describe('AddCompanyBankComponent', () => {
  let component: AddCompanyBankComponent;
  let fixture: ComponentFixture<AddCompanyBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
