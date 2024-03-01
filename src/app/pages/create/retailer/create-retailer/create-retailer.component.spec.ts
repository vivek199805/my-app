import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRetailerComponent } from './create-retailer.component';

describe('CreateRetailerComponent', () => {
  let component: CreateRetailerComponent;
  let fixture: ComponentFixture<CreateRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRetailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
