import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommSettlementComponent } from './comm-settlement.component';

describe('CommSettlementComponent', () => {
  let component: CommSettlementComponent;
  let fixture: ComponentFixture<CommSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommSettlementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
