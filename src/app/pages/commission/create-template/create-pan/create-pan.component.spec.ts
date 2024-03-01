import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePanComponent } from './create-pan.component';

describe('CreatePanComponent', () => {
  let component: CreatePanComponent;
  let fixture: ComponentFixture<CreatePanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
