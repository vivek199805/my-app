import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMatmComponent } from './create-matm.component';

describe('CreateMatmComponent', () => {
  let component: CreateMatmComponent;
  let fixture: ComponentFixture<CreateMatmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMatmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
