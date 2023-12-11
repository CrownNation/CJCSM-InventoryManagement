import { TestBed } from '@angular/core/testing';

import { PipeDefinitionService } from './pipe-definition.service';

describe('PipeDefinitionService', () => {
  let service: PipeDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
