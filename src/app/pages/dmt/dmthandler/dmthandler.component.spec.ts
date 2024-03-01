import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmthandlerComponent } from './dmthandler.component';

describe('DmthandlerComponent', () => {
  let component: DmthandlerComponent;
  let fixture: ComponentFixture<DmthandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DmthandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DmthandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
