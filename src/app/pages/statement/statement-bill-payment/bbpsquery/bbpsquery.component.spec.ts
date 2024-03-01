import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbpsqueryComponent } from './bbpsquery.component';

describe('BbpsqueryComponent', () => {
  let component: BbpsqueryComponent;
  let fixture: ComponentFixture<BbpsqueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BbpsqueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BbpsqueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
