import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementMatmComponent } from './statement-matm.component';

describe('StatementMatmComponent', () => {
  let component: StatementMatmComponent;
  let fixture: ComponentFixture<StatementMatmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementMatmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementMatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
