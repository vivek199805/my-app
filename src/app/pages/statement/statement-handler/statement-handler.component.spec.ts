import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementHandlerComponent } from './statement-handler.component';

describe('StatementHandlerComponent', () => {
  let component: StatementHandlerComponent;
  let fixture: ComponentFixture<StatementHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
