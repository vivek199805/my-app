import { TestBed } from '@angular/core/testing';

import { ScannersService } from './scanners.service';

describe('ScannersService', () => {
  let service: ScannersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScannersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
