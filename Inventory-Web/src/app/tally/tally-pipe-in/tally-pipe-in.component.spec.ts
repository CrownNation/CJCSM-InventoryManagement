import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyPipeInComponent } from './tally-pipe-in.component';

describe('TallyPipeInComponent', () => {
  let component: TallyPipeInComponent;
  let fixture: ComponentFixture<TallyPipeInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyPipeInComponent]
    });
    fixture = TestBed.createComponent(TallyPipeInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
