import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyViewComponent } from './tally-view.component';

describe('TallyViewComponent', () => {
  let component: TallyViewComponent;
  let fixture: ComponentFixture<TallyViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyViewComponent]
    });
    fixture = TestBed.createComponent(TallyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
