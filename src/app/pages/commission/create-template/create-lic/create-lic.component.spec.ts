import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLicComponent } from './create-lic.component';

describe('CreateLicComponent', () => {
  let component: CreateLicComponent;
  let fixture: ComponentFixture<CreateLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
