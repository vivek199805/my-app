import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommIciciDepositComponent } from './comm-icici-deposit.component';

describe('CommIciciDepositComponent', () => {
  let component: CommIciciDepositComponent;
  let fixture: ComponentFixture<CommIciciDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommIciciDepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommIciciDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
