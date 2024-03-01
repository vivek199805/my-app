import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfsignupUserComponent } from './selfsignup-user.component';

describe('SelfsignupUserComponent', () => {
  let component: SelfsignupUserComponent;
  let fixture: ComponentFixture<SelfsignupUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfsignupUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfsignupUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
