import { TestBed } from '@angular/core/testing';
import { GamesUserService } from './games-user.service';

describe('GamesUserService', () => {
  let service: GamesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
