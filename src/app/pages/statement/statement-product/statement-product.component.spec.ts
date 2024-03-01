import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementProductComponent } from './statement-product.component';

describe('StatementProductComponent', () => {
  let component: StatementProductComponent;
  let fixture: ComponentFixture<StatementProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
