import { TestBed, inject } from '@angular/core/testing';

import { MouseService } from './mouse.service';

describe('MouseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MouseService]
    });
  });

  it('should be created', inject([MouseService], (service: MouseService) => {
    expect(service).toBeTruthy();
  }));
});
