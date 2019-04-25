import { TestBed } from '@angular/core/testing';

import { FiltrationService } from './filtration.service';

describe('CategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltrationService = TestBed.get(FiltrationService);
    expect(service).toBeTruthy();
  });
});
