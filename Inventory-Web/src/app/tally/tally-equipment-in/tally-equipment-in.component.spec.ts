import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyEquipmentInComponent } from './tally-equipment-in.component';

describe('TallyEquipmentInComponent', () => {
  let component: TallyEquipmentInComponent;
  let fixture: ComponentFixture<TallyEquipmentInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyEquipmentInComponent]
    });
    fixture = TestBed.createComponent(TallyEquipmentInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
