import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateHandlerComponent } from './account-create-handler.component';

describe('AccountCreateHandlerComponent', () => {
  let component: AccountCreateHandlerComponent;
  let fixture: ComponentFixture<AccountCreateHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreateHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
