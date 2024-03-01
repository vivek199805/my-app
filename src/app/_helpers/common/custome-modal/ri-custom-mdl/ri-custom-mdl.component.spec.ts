import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiCustomMdlComponent } from './ri-custom-mdl.component';

describe('RiCustomMdlComponent', () => {
  let component: RiCustomMdlComponent;
  let fixture: ComponentFixture<RiCustomMdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiCustomMdlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiCustomMdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
