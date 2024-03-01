import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinoCmsComponent } from './edit-fino-cms.component';

describe('EditFinoCmsComponent', () => {
  let component: EditFinoCmsComponent;
  let fixture: ComponentFixture<EditFinoCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinoCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinoCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
