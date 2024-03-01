import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintChatComponent } from './complaint-chat.component';

describe('ComplaintChatComponent', () => {
  let component: ComplaintChatComponent;
  let fixture: ComponentFixture<ComplaintChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
