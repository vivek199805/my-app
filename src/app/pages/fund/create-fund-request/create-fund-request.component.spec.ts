import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFundRequestComponent } from './create-fund-request.component';

describe('CreateFundRequestComponent', () => {
  let component: CreateFundRequestComponent;
  let fixture: ComponentFixture<CreateFundRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFundRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFundRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
