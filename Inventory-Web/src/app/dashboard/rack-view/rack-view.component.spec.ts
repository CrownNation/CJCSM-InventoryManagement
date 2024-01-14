import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackViewComponent } from './rack-view.component';

describe('RackViewComponent', () => {
  let component: RackViewComponent;
  let fixture: ComponentFixture<RackViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RackViewComponent]
    });
    fixture = TestBed.createComponent(RackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
