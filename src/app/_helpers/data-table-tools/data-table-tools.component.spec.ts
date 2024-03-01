import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableToolsComponent } from './data-table-tools.component';

describe('DataTableToolsComponent', () => {
  let component: DataTableToolsComponent;
  let fixture: ComponentFixture<DataTableToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
