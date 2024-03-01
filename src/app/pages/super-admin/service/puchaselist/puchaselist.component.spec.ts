import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuchaselistComponent } from './puchaselist.component';

describe('PuchaselistComponent', () => {
  let component: PuchaselistComponent;
  let fixture: ComponentFixture<PuchaselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuchaselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuchaselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
