import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBbpsComponent } from './create-bbps.component';

describe('CreateBbpsComponent', () => {
  let component: CreateBbpsComponent;
  let fixture: ComponentFixture<CreateBbpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBbpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBbpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
