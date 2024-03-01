import { TestBed } from '@angular/core/testing';

import { AadharValidationService } from './aadhar-validation.service';

describe('AadharValidationService', () => {
  let service: AadharValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AadharValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
