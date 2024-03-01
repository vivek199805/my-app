import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAepsComponent } from './list-aeps.component';

describe('ListAepsComponent', () => {
  let component: ListAepsComponent;
  let fixture: ComponentFixture<ListAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
