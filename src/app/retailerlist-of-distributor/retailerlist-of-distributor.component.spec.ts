import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerlistOfDistributorComponent } from './retailerlist-of-distributor.component';

describe('RetailerlistOfDistributorComponent', () => {
  let component: RetailerlistOfDistributorComponent;
  let fixture: ComponentFixture<RetailerlistOfDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerlistOfDistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerlistOfDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
