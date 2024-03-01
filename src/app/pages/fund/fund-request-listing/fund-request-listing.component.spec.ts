import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRequestListingComponent } from './fund-request-listing.component';

describe('FundRequestListingComponent', () => {
  let component: FundRequestListingComponent;
  let fixture: ComponentFixture<FundRequestListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundRequestListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRequestListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
