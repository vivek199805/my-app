import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceControlComponent } from './service-control.component';

describe('ServiceControlComponent', () => {
  let component: ServiceControlComponent;
  let fixture: ComponentFixture<ServiceControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
