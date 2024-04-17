import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipePropertyRangeComponent } from './pipe-property-range.component';

describe('PipePropertyRangeComponent', () => {
  let component: PipePropertyRangeComponent;
  let fixture: ComponentFixture<PipePropertyRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipePropertyRangeComponent]
    });
    fixture = TestBed.createComponent(PipePropertyRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
