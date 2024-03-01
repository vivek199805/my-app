import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPayoutComponent } from './list-payout.component';

describe('ListPayoutComponent', () => {
  let component: ListPayoutComponent;
  let fixture: ComponentFixture<ListPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
