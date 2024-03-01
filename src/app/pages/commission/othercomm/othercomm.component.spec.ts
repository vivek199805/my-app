import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthercommComponent } from './othercomm.component';

describe('OthercommComponent', () => {
  let component: OthercommComponent;
  let fixture: ComponentFixture<OthercommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthercommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthercommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
