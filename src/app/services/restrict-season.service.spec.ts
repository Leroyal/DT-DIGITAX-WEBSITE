import { TestBed } from '@angular/core/testing';

import { RestrictSeasonService } from './restrict-season.service';

describe('RestrictSeasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestrictSeasonService = TestBed.get(RestrictSeasonService);
    expect(service).toBeTruthy();
  });
});
