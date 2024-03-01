import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FASTagComponent } from './fastag.component';

describe('FASTagComponent', () => {
  let component: FASTagComponent;
  let fixture: ComponentFixture<FASTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FASTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FASTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
