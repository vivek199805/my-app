import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerlistOfSuperdistributorComponent } from './partnerlist-of-superdistributor.component';

describe('PartnerlistOfSuperdistributorComponent', () => {
  let component: PartnerlistOfSuperdistributorComponent;
  let fixture: ComponentFixture<PartnerlistOfSuperdistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerlistOfSuperdistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerlistOfSuperdistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
