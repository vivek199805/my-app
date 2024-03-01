import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommAadhaarComponent } from './comm-aadhaar.component';

describe('CommAadhaarComponent', () => {
  let component: CommAadhaarComponent;
  let fixture: ComponentFixture<CommAadhaarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommAadhaarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommAadhaarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
