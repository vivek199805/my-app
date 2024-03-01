import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinoCmsComponent } from './list-fino-cms.component';

describe('ListFinoCmsComponent', () => {
  let component: ListFinoCmsComponent;
  let fixture: ComponentFixture<ListFinoCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinoCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinoCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
