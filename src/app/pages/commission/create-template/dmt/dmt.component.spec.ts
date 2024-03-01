import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMTComponent } from './dmt.component';

describe('DMTComponent', () => {
  let component: DMTComponent;
  let fixture: ComponentFixture<DMTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
