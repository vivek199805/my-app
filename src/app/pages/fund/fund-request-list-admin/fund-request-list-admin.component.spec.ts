import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRequestListAdminComponent } from './fund-request-list-admin.component';

describe('FundRequestListAdminComponent', () => {
  let component: FundRequestListAdminComponent;
  let fixture: ComponentFixture<FundRequestListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundRequestListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRequestListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
