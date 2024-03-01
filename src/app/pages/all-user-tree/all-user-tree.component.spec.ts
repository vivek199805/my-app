import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserTreeComponent } from './all-user-tree.component';

describe('AllUserTreeComponent', () => {
  let component: AllUserTreeComponent;
  let fixture: ComponentFixture<AllUserTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUserTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
