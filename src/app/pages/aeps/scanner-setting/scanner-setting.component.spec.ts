import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerSettingComponent } from './scanner-setting.component';

describe('ScannerSettingComponent', () => {
  let component: ScannerSettingComponent;
  let fixture: ComponentFixture<ScannerSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannerSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
