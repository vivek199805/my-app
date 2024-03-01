import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpshandlerComponent } from './bbpshandler.component';

describe('BbpshandlerComponent', () => {
  let component: BbpshandlerComponent;
  let fixture: ComponentFixture<BbpshandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpshandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpshandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
