import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementIndonepalComponent } from './statement-indonepal.component';

describe('StatementIndonepalComponent', () => {
  let component: StatementIndonepalComponent;
  let fixture: ComponentFixture<StatementIndonepalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementIndonepalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementIndonepalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
