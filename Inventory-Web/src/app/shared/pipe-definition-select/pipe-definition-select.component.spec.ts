import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeDefinitionSelectComponent } from './pipe-definition-select.component';

describe('PipeDefinitionSelectComponent', () => {
  let component: PipeDefinitionSelectComponent;
  let fixture: ComponentFixture<PipeDefinitionSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeDefinitionSelectComponent]
    });
    fixture = TestBed.createComponent(PipeDefinitionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
