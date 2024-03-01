import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistatementTxnComponent } from './ministatement-txn.component';

describe('MinistatementTxnComponent', () => {
  let component: MinistatementTxnComponent;
  let fixture: ComponentFixture<MinistatementTxnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistatementTxnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistatementTxnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
