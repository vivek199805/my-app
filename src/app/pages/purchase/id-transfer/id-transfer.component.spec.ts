import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdTransferComponent } from './id-transfer.component';

describe('IdTransferComponent', () => {
  let component: IdTransferComponent;
  let fixture: ComponentFixture<IdTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
