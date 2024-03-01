import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatmComponent } from './edit-matm.component';

describe('EditMatmComponent', () => {
  let component: EditMatmComponent;
  let fixture: ComponentFixture<EditMatmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMatmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
