import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerNotificationComponent } from './retailer-notification.component';

describe('RetailerNotificationComponent', () => {
  let component: RetailerNotificationComponent;
  let fixture: ComponentFixture<RetailerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
