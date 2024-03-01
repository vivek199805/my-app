import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AepshandlerComponent } from './aepshandler.component';

describe('AepshandlerComponent', () => {
  let component: AepshandlerComponent;
  let fixture: ComponentFixture<AepshandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AepshandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AepshandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
