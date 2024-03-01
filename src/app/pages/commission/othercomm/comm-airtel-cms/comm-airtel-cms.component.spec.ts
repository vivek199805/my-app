import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommAirtelCmsComponent } from './comm-airtel-cms.component';

describe('CommAirtelCmsComponent', () => {
  let component: CommAirtelCmsComponent;
  let fixture: ComponentFixture<CommAirtelCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommAirtelCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommAirtelCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
