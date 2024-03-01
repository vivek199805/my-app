import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerCertificateComponent } from './retailer-certificate.component';

describe('RetailerCertificateComponent', () => {
  let component: RetailerCertificateComponent;
  let fixture: ComponentFixture<RetailerCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerCertificateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
