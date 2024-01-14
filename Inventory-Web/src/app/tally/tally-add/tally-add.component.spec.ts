import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyAddComponent } from './tally-add.component';

describe('TallyAddComponent', () => {
  let component: TallyAddComponent;
  let fixture: ComponentFixture<TallyAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyAddComponent]
    });
    fixture = TestBed.createComponent(TallyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
