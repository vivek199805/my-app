import { TestBed } from '@angular/core/testing';

import { PurchaseProdService } from './purchase-prod.service';

describe('PurchaseProdService', () => {
  let service: PurchaseProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
