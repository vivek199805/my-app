import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorlistOfSuperdistributorComponent } from './distributorlist-of-superdistributor.component';

describe('DistributorlistOfSuperdistributorComponent', () => {
  let component: DistributorlistOfSuperdistributorComponent;
  let fixture: ComponentFixture<DistributorlistOfSuperdistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorlistOfSuperdistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorlistOfSuperdistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
