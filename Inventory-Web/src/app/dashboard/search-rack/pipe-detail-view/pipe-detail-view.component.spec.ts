import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeDetailViewComponent } from './pipe-detail-view.component';

describe('PipeDetailViewComponent', () => {
  let component: PipeDetailViewComponent;
  let fixture: ComponentFixture<PipeDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeDetailViewComponent]
    });
    fixture = TestBed.createComponent(PipeDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
