import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailViewComponent } from './equipment-detail-view.component';

describe('EquipmentDetailViewComponent', () => {
  let component: EquipmentDetailViewComponent;
  let fixture: ComponentFixture<EquipmentDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentDetailViewComponent]
    });
    fixture = TestBed.createComponent(EquipmentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
