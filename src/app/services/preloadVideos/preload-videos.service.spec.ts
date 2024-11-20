import { TestBed } from '@angular/core/testing';

import { PreloadVideosService } from './preload-videos.service';

describe('PreloadVideosService', () => {
  let service: PreloadVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
