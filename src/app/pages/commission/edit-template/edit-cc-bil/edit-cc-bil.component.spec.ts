import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCCBILComponent } from './edit-cc-bil.component';

describe('EditCCBILComponent', () => {
  let component: EditCCBILComponent;
  let fixture: ComponentFixture<EditCCBILComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCCBILComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCCBILComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
