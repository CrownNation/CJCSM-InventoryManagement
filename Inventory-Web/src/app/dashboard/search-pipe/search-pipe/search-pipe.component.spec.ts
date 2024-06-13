import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPipeComponent } from './search-pipe.component';
import { beforeEach, describe, it } from 'node:test';

describe('SearchPipeComponent', () => {
  let component: SearchPipeComponent;
  let fixture: ComponentFixture<SearchPipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPipeComponent]
    });
    fixture = TestBed.createComponent(SearchPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
