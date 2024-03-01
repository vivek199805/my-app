import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFastagComponent } from './list-fastag.component';

describe('ListFastagComponent', () => {
  let component: ListFastagComponent;
  let fixture: ComponentFixture<ListFastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
