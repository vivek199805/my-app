import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundListingComponent } from './fund-listing.component';

describe('FundListingComponent', () => {
  let component: FundListingComponent;
  let fixture: ComponentFixture<FundListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
