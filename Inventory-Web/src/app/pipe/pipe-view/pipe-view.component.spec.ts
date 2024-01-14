import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeViewComponent } from './pipe-view.component';

describe('PipeViewComponent', () => {
  let component: PipeViewComponent;
  let fixture: ComponentFixture<PipeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeViewComponent]
    });
    fixture = TestBed.createComponent(PipeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
