import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdepositHandlerComponent } from './cashdeposit-handler.component';

describe('CashdepositHandlerComponent', () => {
  let component: CashdepositHandlerComponent;
  let fixture: ComponentFixture<CashdepositHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashdepositHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashdepositHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
