import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsDashboardComponent } from './bbps-dashboard.component';

describe('BbpsDashboardComponent', () => {
  let component: BbpsDashboardComponent;
  let fixture: ComponentFixture<BbpsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
