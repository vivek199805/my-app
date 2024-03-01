import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayoutComponent } from './edit-payout.component';

describe('EditPayoutComponent', () => {
  let component: EditPayoutComponent;
  let fixture: ComponentFixture<EditPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
