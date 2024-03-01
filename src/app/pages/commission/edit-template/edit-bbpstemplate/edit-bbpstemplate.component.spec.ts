import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBBPStemplateComponent } from './edit-bbpstemplate.component';

describe('EditBBPStemplateComponent', () => {
  let component: EditBBPStemplateComponent;
  let fixture: ComponentFixture<EditBBPStemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBBPStemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBBPStemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
