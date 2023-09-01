import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeCoatingAddComponent } from './pipe-coating-add.component';

describe('PipeCoatingAddComponent', () => {
  let component: PipeCoatingAddComponent;
  let fixture: ComponentFixture<PipeCoatingAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeCoatingAddComponent]
    });
    fixture = TestBed.createComponent(PipeCoatingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
