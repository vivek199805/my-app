import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupdistributorComponent } from './list-supdistributor.component';

describe('ListSupdistributorComponent', () => {
  let component: ListSupdistributorComponent;
  let fixture: ComponentFixture<ListSupdistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSupdistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupdistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
