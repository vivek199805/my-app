import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanComponent } from './edit-pan.component';

describe('EditPanComponent', () => {
  let component: EditPanComponent;
  let fixture: ComponentFixture<EditPanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
