import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IciciCashdepositeQueryComponent } from './icici-cashdeposite-query.component';

describe('IciciCashdepositeQueryComponent', () => {
  let component: IciciCashdepositeQueryComponent;
  let fixture: ComponentFixture<IciciCashdepositeQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IciciCashdepositeQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IciciCashdepositeQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
