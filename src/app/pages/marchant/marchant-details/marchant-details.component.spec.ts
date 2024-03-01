import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantDetailsComponent } from './marchant-details.component';

describe('MarchantDetailsComponent', () => {
  let component: MarchantDetailsComponent;
  let fixture: ComponentFixture<MarchantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
