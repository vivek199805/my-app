import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerShowComponent } from './banner-show.component';

describe('BannerShowComponent', () => {
  let component: BannerShowComponent;
  let fixture: ComponentFixture<BannerShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
