import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBbpsComponent } from './list-bbps.component';

describe('ListBbpsComponent', () => {
  let component: ListBbpsComponent;
  let fixture: ComponentFixture<ListBbpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBbpsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBbpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
