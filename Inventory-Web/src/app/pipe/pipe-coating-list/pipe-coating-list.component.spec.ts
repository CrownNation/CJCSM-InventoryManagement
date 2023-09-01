import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeCoatingListComponent } from './pipe-coating-list.component';

describe('PipeCoatingListComponent', () => {
  let component: PipeCoatingListComponent;
  let fixture: ComponentFixture<PipeCoatingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeCoatingListComponent]
    });
    fixture = TestBed.createComponent(PipeCoatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
