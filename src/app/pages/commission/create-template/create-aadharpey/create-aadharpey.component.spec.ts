import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAadharpeyComponent } from './create-aadharpey.component';

describe('CreateAadharpeyComponent', () => {
  let component: CreateAadharpeyComponent;
  let fixture: ComponentFixture<CreateAadharpeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAadharpeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAadharpeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
