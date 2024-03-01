import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRetailerComponent } from './list-retailer.component';

describe('ListRetailerComponent', () => {
  let component: ListRetailerComponent;
  let fixture: ComponentFixture<ListRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRetailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
