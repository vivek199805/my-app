import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationhandlerComponent } from './notificationhandler.component';

describe('NotificationhandlerComponent', () => {
  let component: NotificationhandlerComponent;
  let fixture: ComponentFixture<NotificationhandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationhandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationhandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
