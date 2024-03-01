import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementAirtelCmsComponent } from './statement-airtel-cms.component';

describe('StatementAirtelCmsComponent', () => {
  let component: StatementAirtelCmsComponent;
  let fixture: ComponentFixture<StatementAirtelCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementAirtelCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementAirtelCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
