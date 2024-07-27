import { TestBed } from '@angular/core/testing';

import { EquipmentDefinitionService } from '../equipment-definition.service';

describe('EquipmentDefinitionService', () => {
  let service: EquipmentDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
