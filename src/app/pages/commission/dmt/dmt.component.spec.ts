import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtComponent } from './dmt.component';

describe('DmtComponent', () => {
  let component: DmtComponent;
  let fixture: ComponentFixture<DmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
