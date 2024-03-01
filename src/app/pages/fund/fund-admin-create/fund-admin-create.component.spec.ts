import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAdminCreateComponent } from './fund-admin-create.component';

describe('FundAdminCreateComponent', () => {
  let component: FundAdminCreateComponent;
  let fixture: ComponentFixture<FundAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundAdminCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
