import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchantListComponent } from './marchant-list.component';

describe('MarchantListComponent', () => {
  let component: MarchantListComponent;
  let fixture: ComponentFixture<MarchantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarchantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
