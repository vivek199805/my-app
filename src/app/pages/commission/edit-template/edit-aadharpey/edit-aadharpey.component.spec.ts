import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAadharpeyComponent } from './edit-aadharpey.component';

describe('EditAadharpeyComponent', () => {
  let component: EditAadharpeyComponent;
  let fixture: ComponentFixture<EditAadharpeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAadharpeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAadharpeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
