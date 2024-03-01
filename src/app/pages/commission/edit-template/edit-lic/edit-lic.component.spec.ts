import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicComponent } from './edit-lic.component';

describe('EditLicComponent', () => {
  let component: EditLicComponent;
  let fixture: ComponentFixture<EditLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
