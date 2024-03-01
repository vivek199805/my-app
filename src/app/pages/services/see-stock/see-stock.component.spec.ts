import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeStockComponent } from './see-stock.component';

describe('SeeStockComponent', () => {
  let component: SeeStockComponent;
  let fixture: ComponentFixture<SeeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
