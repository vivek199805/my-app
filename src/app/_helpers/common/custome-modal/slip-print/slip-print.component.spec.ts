import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipPrintComponent } from './slip-print.component';

describe('SlipPrintComponent', () => {
  let component: SlipPrintComponent;
  let fixture: ComponentFixture<SlipPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlipPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlipPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
