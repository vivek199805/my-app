import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCCBILComponent } from './list-cc-bil.component';

describe('ListCCBILComponent', () => {
  let component: ListCCBILComponent;
  let fixture: ComponentFixture<ListCCBILComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCCBILComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCCBILComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
