import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationHubComponent } from './notification-hub.component';

describe('NotificationHubComponent', () => {
  let component: NotificationHubComponent;
  let fixture: ComponentFixture<NotificationHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationHubComponent]
    });
    fixture = TestBed.createComponent(NotificationHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
