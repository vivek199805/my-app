import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListICICICWComponent } from './list-icici-cw.component';

describe('ListICICICWComponent', () => {
  let component: ListICICICWComponent;
  let fixture: ComponentFixture<ListICICICWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListICICICWComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListICICICWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
