import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipePropertyCoatingComponent } from './pipe-property-coating.component';

describe('PipePropertyCoatingComponent', () => {
  let component: PipePropertyCoatingComponent;
  let fixture: ComponentFixture<PipePropertyCoatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipePropertyCoatingComponent]
    });
    fixture = TestBed.createComponent(PipePropertyCoatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
