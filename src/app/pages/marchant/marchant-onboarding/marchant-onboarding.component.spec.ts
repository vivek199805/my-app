import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantOnboardingComponent } from './marchant-onboarding.component';

describe('MarchantOnboardingComponent', () => {
  let component: MarchantOnboardingComponent;
  let fixture: ComponentFixture<MarchantOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchantOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
