import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAdminApproveComponent } from './fund-admin-approve.component';

describe('FundAdminApproveComponent', () => {
  let component: FundAdminApproveComponent;
  let fixture: ComponentFixture<FundAdminApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundAdminApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAdminApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
