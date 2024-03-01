import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommMiniStatementComponent } from './comm-mini-statement.component';

describe('CommMiniStatementComponent', () => {
  let component: CommMiniStatementComponent;
  let fixture: ComponentFixture<CommMiniStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommMiniStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommMiniStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
