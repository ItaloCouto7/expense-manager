import { Component, OnInit } from '@angular/core';
import { TransactionService, ITransaction } from '../../services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe]  // <-- Adicione aqui
})
export class TransactionListComponent implements OnInit {

  transactions: ITransaction[] = [];

  constructor(private transactionService: TransactionService, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  deleteTransaction(id?: number): void {
    if (!id) return;
    this.transactionService.deleteTransaction(id).subscribe(() => {
      this.loadTransactions();
    });
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL') || '';
  }
}
