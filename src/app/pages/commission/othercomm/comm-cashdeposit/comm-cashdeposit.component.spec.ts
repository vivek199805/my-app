import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommCashdepositComponent } from './comm-cashdeposit.component';

describe('CommCashdepositComponent', () => {
  let component: CommCashdepositComponent;
  let fixture: ComponentFixture<CommCashdepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommCashdepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommCashdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
