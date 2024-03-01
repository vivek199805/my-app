import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAdminListingComponent } from './fund-admin-listing.component';

describe('FundAdminListingComponent', () => {
  let component: FundAdminListingComponent;
  let fixture: ComponentFixture<FundAdminListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundAdminListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAdminListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
