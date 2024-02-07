import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipepropertiesComponent } from './pipeproperties.component';

describe('PipepropertiesComponent', () => {
  let component: PipepropertiesComponent;
  let fixture: ComponentFixture<PipepropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipepropertiesComponent]
    });
    fixture = TestBed.createComponent(PipepropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
