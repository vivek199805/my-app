import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCCBILLComponent } from './create-cc-bill.component';

describe('CreateCCBILLComponent', () => {
  let component: CreateCCBILLComponent;
  let fixture: ComponentFixture<CreateCCBILLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCCBILLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCCBILLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
