import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateICICICWComponent } from './create-icici-cw.component';

describe('CreateICICICWComponent', () => {
  let component: CreateICICICWComponent;
  let fixture: ComponentFixture<CreateICICICWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateICICICWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateICICICWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
