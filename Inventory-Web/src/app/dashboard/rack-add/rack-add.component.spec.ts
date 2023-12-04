import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackAddComponent } from './rack-add.component';

describe('RackAddComponent', () => {
  let component: RackAddComponent;
  let fixture: ComponentFixture<RackAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackAddComponent]
    });
    fixture = TestBed.createComponent(RackAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
