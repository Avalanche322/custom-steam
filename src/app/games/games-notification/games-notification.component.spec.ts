import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesNotificationComponent } from './games-notification.component';

describe('GamesNotificationComponent', () => {
  let component: GamesNotificationComponent;
  let fixture: ComponentFixture<GamesNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have only one span child element', () => {
    fixture.detectChanges();
    component.messageType = 'games';
    const template = fixture.debugElement.nativeElement;
    expect(template.querySelector('span').length).toBe(1);
  })
});
