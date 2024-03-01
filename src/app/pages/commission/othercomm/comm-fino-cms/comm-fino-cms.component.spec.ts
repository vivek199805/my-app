import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommFinoCmsComponent } from './comm-fino-cms.component';

describe('CommFinoCmsComponent', () => {
  let component: CommFinoCmsComponent;
  let fixture: ComponentFixture<CommFinoCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommFinoCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommFinoCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
