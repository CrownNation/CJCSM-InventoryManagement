import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeTransferComponent } from './pipe-transfer.component';

describe('PipeTransferComponent', () => {
  let component: PipeTransferComponent;
  let fixture: ComponentFixture<PipeTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeTransferComponent]
    });
    fixture = TestBed.createComponent(PipeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
