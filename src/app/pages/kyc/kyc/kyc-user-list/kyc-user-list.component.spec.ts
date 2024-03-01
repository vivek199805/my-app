import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserListComponent } from './kyc-user-list.component';

describe('KycUserListComponent', () => {
  let component: KycUserListComponent;
  let fixture: ComponentFixture<KycUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
