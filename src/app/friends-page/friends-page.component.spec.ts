import { Firestore } from '@angular/fire/firestore';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPageComponent } from './friends-page.component';
import { FriendsService } from './services/friends.service';

describe('FriendsPageComponent', () => {
  let component: FriendsPageComponent;
  let fixture: ComponentFixture<FriendsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPageComponent ],
      providers: [FriendsService, Firestore]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
