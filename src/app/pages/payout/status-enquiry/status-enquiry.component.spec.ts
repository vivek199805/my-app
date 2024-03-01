import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEnquiryComponent } from './status-enquiry.component';

describe('StatusEnquiryComponent', () => {
  let component: StatusEnquiryComponent;
  let fixture: ComponentFixture<StatusEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
