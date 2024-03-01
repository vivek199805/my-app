import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatmComponent } from './list-matm.component';

describe('ListMatmComponent', () => {
  let component: ListMatmComponent;
  let fixture: ComponentFixture<ListMatmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMatmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
