import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PancommComponent } from './pancomm.component';

describe('PancommComponent', () => {
  let component: PancommComponent;
  let fixture: ComponentFixture<PancommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PancommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PancommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
