import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPipeTransferComponent } from './dialog-pipe-transfer.component';

describe('DialogPipeTransferComponent', () => {
  let component: DialogPipeTransferComponent;
  let fixture: ComponentFixture<DialogPipeTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogPipeTransferComponent]
    });
    fixture = TestBed.createComponent(DialogPipeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
