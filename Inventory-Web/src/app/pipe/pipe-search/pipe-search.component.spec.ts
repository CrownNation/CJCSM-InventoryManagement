import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeSearchComponent } from './pipe-search.component';

describe('PipeSearchComponent', () => {
  let component: PipeSearchComponent;
  let fixture: ComponentFixture<PipeSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeSearchComponent]
    });
    fixture = TestBed.createComponent(PipeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
