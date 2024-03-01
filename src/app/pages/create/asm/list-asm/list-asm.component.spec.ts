import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsmComponent } from './list-asm.component';

describe('ListAsmComponent', () => {
  let component: ListAsmComponent;
  let fixture: ComponentFixture<ListAsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
