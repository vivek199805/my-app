import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyBankComponent } from './list-company-bank.component';

describe('ListCompanyBankComponent', () => {
  let component: ListCompanyBankComponent;
  let fixture: ComponentFixture<ListCompanyBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompanyBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
