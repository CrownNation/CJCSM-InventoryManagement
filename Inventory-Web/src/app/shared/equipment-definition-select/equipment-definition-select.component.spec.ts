import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDefinitionSelectComponent } from './equipment-definition-select.component';

describe('EquipmentDefinitionSelectComponent', () => {
  let component: EquipmentDefinitionSelectComponent;
  let fixture: ComponentFixture<EquipmentDefinitionSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentDefinitionSelectComponent]
    });
    fixture = TestBed.createComponent(EquipmentDefinitionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
