import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargequeryComponent } from './rechargequery.component';

describe('RechargequeryComponent', () => {
  let component: RechargequeryComponent;
  let fixture: ComponentFixture<RechargequeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechargequeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargequeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
