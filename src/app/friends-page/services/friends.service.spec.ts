import { Firestore } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';

import { FriendsService } from './friends.service';

describe('FriendsService', () => {
  let service: FriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Firestore]
    });
    service = TestBed.inject(FriendsService);
  });

  //it('should be created', () => {
  //  expect(service).toBeTruthy();
  //});
});
