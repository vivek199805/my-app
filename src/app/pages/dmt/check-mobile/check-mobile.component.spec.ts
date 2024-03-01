import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMobileComponent } from './check-mobile.component';

describe('CheckMobileComponent', () => {
  let component: CheckMobileComponent;
  let fixture: ComponentFixture<CheckMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
