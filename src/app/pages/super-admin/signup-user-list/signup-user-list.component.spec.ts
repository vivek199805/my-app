import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUserListComponent } from './signup-user-list.component';

describe('SignupUserListComponent', () => {
  let component: SignupUserListComponent;
  let fixture: ComponentFixture<SignupUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
