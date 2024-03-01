import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniStatementReceiptComponent } from './mini-statement-receipt.component';

describe('MiniStatementReceiptComponent', () => {
  let component: MiniStatementReceiptComponent;
  let fixture: ComponentFixture<MiniStatementReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniStatementReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniStatementReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
