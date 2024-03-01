import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLicComponent } from './list-lic.component';

describe('ListLicComponent', () => {
  let component: ListLicComponent;
  let fixture: ComponentFixture<ListLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
