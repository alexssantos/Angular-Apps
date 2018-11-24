import { TestBed } from '@angular/core/testing';

import { OfertasService } from './ofertas.service';

describe('OfertasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfertasService = TestBed.get(OfertasService);
    expect(service).toBeTruthy();
  });
});
