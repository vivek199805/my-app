import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainthandlerComponent } from './complainthandler.component';

describe('ComplainthandlerComponent', () => {
  let component: ComplainthandlerComponent;
  let fixture: ComponentFixture<ComplainthandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainthandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainthandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
