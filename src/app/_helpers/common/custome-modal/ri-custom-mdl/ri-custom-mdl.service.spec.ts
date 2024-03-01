import { TestBed } from '@angular/core/testing';

import { RiCustomMdlService } from './ri-custom-mdl.service';

describe('RiCustomMdlService', () => {
  let service: RiCustomMdlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiCustomMdlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
