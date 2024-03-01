import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDistributorDashboardComponent } from './super-distributor-dashboard.component';

describe('SuperDistributorDashboardComponent', () => {
  let component: SuperDistributorDashboardComponent;
  let fixture: ComponentFixture<SuperDistributorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperDistributorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperDistributorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
