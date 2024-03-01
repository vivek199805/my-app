import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtListComponent } from './dmt-list.component';

describe('DmtListComponent', () => {
  let component: DmtListComponent;
  let fixture: ComponentFixture<DmtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmtListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
