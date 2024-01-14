import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyListComponent } from './tally-list.component';

describe('TallyListComponent', () => {
  let component: TallyListComponent;
  let fixture: ComponentFixture<TallyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyListComponent]
    });
    fixture = TestBed.createComponent(TallyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
