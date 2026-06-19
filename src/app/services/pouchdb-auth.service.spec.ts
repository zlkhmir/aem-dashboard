import { TestBed } from '@angular/core/testing';

import { PouchdbAuthService } from './pouchdb-auth.service';

describe('PouchdbAuthService', () => {
  let service: PouchdbAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PouchdbAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
