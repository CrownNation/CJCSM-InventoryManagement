import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRackComponent } from './add-rack.component';

describe('AddRackComponent', () => {
  let component: AddRackComponent;
  let fixture: ComponentFixture<AddRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRackComponent]
    });
    fixture = TestBed.createComponent(AddRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
