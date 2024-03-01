import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAepsComponent } from './create-aeps.component';

describe('CreateAepsComponent', () => {
  let component: CreateAepsComponent;
  let fixture: ComponentFixture<CreateAepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
