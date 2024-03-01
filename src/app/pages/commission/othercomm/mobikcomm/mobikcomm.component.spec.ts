import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobikcommComponent } from './mobikcomm.component';

describe('MobikcommComponent', () => {
  let component: MobikcommComponent;
  let fixture: ComponentFixture<MobikcommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobikcommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobikcommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
