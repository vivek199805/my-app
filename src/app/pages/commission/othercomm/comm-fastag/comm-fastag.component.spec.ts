import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommFastagComponent } from './comm-fastag.component';

describe('CommFastagComponent', () => {
  let component: CommFastagComponent;
  let fixture: ComponentFixture<CommFastagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommFastagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommFastagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
