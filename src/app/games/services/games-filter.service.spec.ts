import { TestBed } from '@angular/core/testing';
import { GamesFilterService } from './games-filter.service';

describe('GamesFilterService', () => {
  let service: GamesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
