import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundHandlerComponent } from './fund-handler.component';

describe('FundHandlerComponent', () => {
  let component: FundHandlerComponent;
  let fixture: ComponentFixture<FundHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
