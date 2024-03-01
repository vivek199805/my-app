import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanStatementComponent } from './pan-statement.component';

describe('PanStatementComponent', () => {
  let component: PanStatementComponent;
  let fixture: ComponentFixture<PanStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
