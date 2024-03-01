import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcomplaintComponent } from './listcomplaint.component';

describe('ListcomplaintComponent', () => {
  let component: ListcomplaintComponent;
  let fixture: ComponentFixture<ListcomplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcomplaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
