import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinistatementComponent } from './create-ministatement.component';

describe('CreateMinistatementComponent', () => {
  let component: CreateMinistatementComponent;
  let fixture: ComponentFixture<CreateMinistatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMinistatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinistatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
