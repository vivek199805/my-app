import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsmComponent } from './create-asm.component';

describe('CreateAsmComponent', () => {
  let component: CreateAsmComponent;
  let fixture: ComponentFixture<CreateAsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
