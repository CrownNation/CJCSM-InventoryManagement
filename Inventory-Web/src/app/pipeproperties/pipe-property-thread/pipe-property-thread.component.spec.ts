import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipePropertyThreadComponent } from './pipe-property-thread.component';

describe('PipePropertyThreadComponent', () => {
  let component: PipePropertyThreadComponent;
  let fixture: ComponentFixture<PipePropertyThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipePropertyThreadComponent]
    });
    fixture = TestBed.createComponent(PipePropertyThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
