import { TestBed, inject } from '@angular/core/testing';

import { SortService } from './sort.service';

describe('SortService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortService]
    });
  });

  it('should be created', inject([SortService], (service: SortService) => {
    expect(service).toBeTruthy();
  }));
});
