import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMinistatementComponent } from './list-ministatement.component';

describe('ListMinistatementComponent', () => {
  let component: ListMinistatementComponent;
  let fixture: ComponentFixture<ListMinistatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMinistatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMinistatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
