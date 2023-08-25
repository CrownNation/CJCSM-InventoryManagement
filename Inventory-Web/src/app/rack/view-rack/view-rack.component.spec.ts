import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRackComponent } from './view-rack.component';

describe('ViewRackComponent', () => {
  let component: ViewRackComponent;
  let fixture: ComponentFixture<ViewRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRackComponent]
    });
    fixture = TestBed.createComponent(ViewRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
