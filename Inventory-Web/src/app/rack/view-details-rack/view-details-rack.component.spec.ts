import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsRackComponent } from './view-details-rack.component';

describe('ViewDetailsRackComponent', () => {
  let component: ViewDetailsRackComponent;
  let fixture: ComponentFixture<ViewDetailsRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsRackComponent]
    });
    fixture = TestBed.createComponent(ViewDetailsRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
