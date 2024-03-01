import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditICICICWComponent } from './edit-icici-cw.component';

describe('EditICICICWComponent', () => {
  let component: EditICICICWComponent;
  let fixture: ComponentFixture<EditICICICWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditICICICWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditICICICWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
