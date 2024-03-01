import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFinoCmsComponent } from './create-fino-cms.component';

describe('CreateFinoCmsComponent', () => {
  let component: CreateFinoCmsComponent;
  let fixture: ComponentFixture<CreateFinoCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFinoCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFinoCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
