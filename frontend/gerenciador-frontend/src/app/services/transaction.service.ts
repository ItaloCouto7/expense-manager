import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITransaction {
  id?: number;
  type: 'entrada' | 'saida';
  category: string;
  amount: number;
  description?: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8000/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<ITransaction[]>(this.apiUrl);
  }

  addTransaction(transaction: ITransaction): Observable<ITransaction> {
    return this.http.post<ITransaction>(this.apiUrl, transaction);
  }

  updateTransaction(id: number, transaction: ITransaction): Observable<ITransaction> {
    return this.http.put<ITransaction>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
