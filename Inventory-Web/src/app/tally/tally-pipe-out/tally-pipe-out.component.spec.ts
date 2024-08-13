import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyPipeOutComponent } from './tally-pipe-out.component';

describe('TallyPipeOutComponent', () => {
  let component: TallyPipeOutComponent;
  let fixture: ComponentFixture<TallyPipeOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyPipeOutComponent]
    });
    fixture = TestBed.createComponent(TallyPipeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
