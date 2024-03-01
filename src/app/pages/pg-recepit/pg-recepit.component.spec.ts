import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgRecepitComponent } from './pg-recepit.component';

describe('PgRecepitComponent', () => {
  let component: PgRecepitComponent;
  let fixture: ComponentFixture<PgRecepitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgRecepitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PgRecepitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
