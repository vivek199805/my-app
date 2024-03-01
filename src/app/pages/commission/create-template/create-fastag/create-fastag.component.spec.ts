import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFastagComponent } from './create-fastag.component';

describe('CreateFastagComponent', () => {
  let component: CreateFastagComponent;
  let fixture: ComponentFixture<CreateFastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
