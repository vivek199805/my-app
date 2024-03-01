import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAepsComponent } from './edit-aeps.component';

describe('EditAepsComponent', () => {
  let component: EditAepsComponent;
  let fixture: ComponentFixture<EditAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
