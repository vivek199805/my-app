import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashfreeListAccountComponent } from './cashfree-list-account.component';

describe('CashfreeListAccountComponent', () => {
  let component: CashfreeListAccountComponent;
  let fixture: ComponentFixture<CashfreeListAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashfreeListAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashfreeListAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
