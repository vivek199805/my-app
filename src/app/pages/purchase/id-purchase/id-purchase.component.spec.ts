import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdPurchaseComponent } from './id-purchase.component';

describe('IdPurchaseComponent', () => {
  let component: IdPurchaseComponent;
  let fixture: ComponentFixture<IdPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
