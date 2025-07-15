import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { provideHttpClient } from '@angular/common/http';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
