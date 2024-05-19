import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRackComponent } from './search-rack.component';

describe('SearchRackComponent', () => {
  let component: SearchRackComponent;
  let fixture: ComponentFixture<SearchRackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRackComponent]
    });
    fixture = TestBed.createComponent(SearchRackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
