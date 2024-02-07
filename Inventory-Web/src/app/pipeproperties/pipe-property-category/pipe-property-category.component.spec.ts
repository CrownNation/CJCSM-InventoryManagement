import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipePropertyCategoryComponent } from './pipe-property-category.component';

describe('PipePropertyCategoryComponent', () => {
  let component: PipePropertyCategoryComponent;
  let fixture: ComponentFixture<PipePropertyCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipePropertyCategoryComponent]
    });
    fixture = TestBed.createComponent(PipePropertyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
