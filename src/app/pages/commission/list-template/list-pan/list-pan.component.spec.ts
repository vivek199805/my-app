import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanComponent } from './list-pan.component';

describe('ListPanComponent', () => {
  let component: ListPanComponent;
  let fixture: ComponentFixture<ListPanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
