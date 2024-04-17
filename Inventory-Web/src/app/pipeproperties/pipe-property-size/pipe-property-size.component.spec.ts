import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipePropertySizeComponent } from './pipe-property-size.component';

describe('PipePropertySizeComponent', () => {
  let component: PipePropertySizeComponent;
  let fixture: ComponentFixture<PipePropertySizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipePropertySizeComponent]
    });
    fixture = TestBed.createComponent(PipePropertySizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
