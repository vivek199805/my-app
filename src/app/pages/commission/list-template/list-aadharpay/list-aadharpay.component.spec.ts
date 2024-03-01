import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAadharpayComponent } from './list-aadharpay.component';

describe('ListAadharpayComponent', () => {
  let component: ListAadharpayComponent;
  let fixture: ComponentFixture<ListAadharpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAadharpayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAadharpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
