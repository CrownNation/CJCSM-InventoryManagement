import { TestBed } from '@angular/core/testing';

import { PipePropertiesService } from './pipe-properties.service';

describe('PipePropertiesService', () => {
  let service: PipePropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipePropertiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
