import { TestBed } from '@angular/core/testing';

import { SimpleAlertService } from './simple-alert.service';

describe('SimpleAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimpleAlertService = TestBed.get(SimpleAlertService);
    expect(service).toBeTruthy();
  });
});
