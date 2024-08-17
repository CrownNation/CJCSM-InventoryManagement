import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyEquipmentOutComponent } from './tally-equipment-out.component';

describe('TallyEquipmentOutComponent', () => {
  let component: TallyEquipmentOutComponent;
  let fixture: ComponentFixture<TallyEquipmentOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyEquipmentOutComponent]
    });
    fixture = TestBed.createComponent(TallyEquipmentOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
