import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallyDashboardComponent } from './tally-dashboard.component';

describe('TallyDashboardComponent', () => {
  let component: TallyDashboardComponent;
  let fixture: ComponentFixture<TallyDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TallyDashboardComponent]
    });
    fixture = TestBed.createComponent(TallyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
