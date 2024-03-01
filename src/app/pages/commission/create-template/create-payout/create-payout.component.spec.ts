import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePayoutComponent } from './create-payout.component';

describe('CreatePayoutComponent', () => {
  let component: CreatePayoutComponent;
  let fixture: ComponentFixture<CreatePayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
