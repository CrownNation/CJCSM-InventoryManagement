import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeConfigComponent } from './pipe-config.component';

describe('PipeConfigComponent', () => {
  let component: PipeConfigComponent;
  let fixture: ComponentFixture<PipeConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeConfigComponent]
    });
    fixture = TestBed.createComponent(PipeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
