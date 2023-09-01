import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeAddDefinitionComponent } from './pipe-add-definition.component';

describe('PipeAddDefinitionComponent', () => {
  let component: PipeAddDefinitionComponent;
  let fixture: ComponentFixture<PipeAddDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeAddDefinitionComponent]
    });
    fixture = TestBed.createComponent(PipeAddDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
