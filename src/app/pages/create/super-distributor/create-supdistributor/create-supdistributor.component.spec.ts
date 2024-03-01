import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupdistributorComponent } from './create-supdistributor.component';

describe('CreateSupdistributorComponent', () => {
  let component: CreateSupdistributorComponent;
  let fixture: ComponentFixture<CreateSupdistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSupdistributorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSupdistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
