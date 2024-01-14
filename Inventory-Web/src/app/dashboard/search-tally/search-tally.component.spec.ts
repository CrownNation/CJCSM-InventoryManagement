import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTallyComponent } from './search-tally.component';

describe('SearchTallyComponent', () => {
  let component: SearchTallyComponent;
  let fixture: ComponentFixture<SearchTallyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTallyComponent]
    });
    fixture = TestBed.createComponent(SearchTallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
