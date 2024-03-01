import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackurlComponent } from './callbackurl.component';

describe('CallbackurlComponent', () => {
  let component: CallbackurlComponent;
  let fixture: ComponentFixture<CallbackurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallbackurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
