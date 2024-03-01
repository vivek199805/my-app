import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMinistatementComponent } from './edit-ministatement.component';

describe('EditMinistatementComponent', () => {
  let component: EditMinistatementComponent;
  let fixture: ComponentFixture<EditMinistatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMinistatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMinistatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
