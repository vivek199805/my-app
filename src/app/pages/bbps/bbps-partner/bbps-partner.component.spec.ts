import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsPartnerComponent } from './bbps-partner.component';

describe('BbpsPartnerComponent', () => {
  let component: BbpsPartnerComponent;
  let fixture: ComponentFixture<BbpsPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
