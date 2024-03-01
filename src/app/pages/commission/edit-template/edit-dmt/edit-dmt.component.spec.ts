import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDmtComponent } from './edit-dmt.component';

describe('EditDmtComponent', () => {
  let component: EditDmtComponent;
  let fixture: ComponentFixture<EditDmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
