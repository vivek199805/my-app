import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadhaarPayComponent } from './aadhaar-pay.component';

describe('AadhaarPayComponent', () => {
  let component: AadhaarPayComponent;
  let fixture: ComponentFixture<AadhaarPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AadhaarPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AadhaarPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
