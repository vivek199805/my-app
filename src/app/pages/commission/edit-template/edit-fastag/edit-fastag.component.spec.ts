import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFastagComponent } from './edit-fastag.component';

describe('EditFastagComponent', () => {
  let component: EditFastagComponent;
  let fixture: ComponentFixture<EditFastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
