import { Component, OnInit } from '@angular/core';
import {
  TransactionService,
  ITransaction,
} from '../../services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SuggestionService } from '../../services/openai.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
})
export class TransactionListComponent implements OnInit {
  transactions: ITransaction[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  suggestionsText: string = '';

  constructor(private transactionService: TransactionService, private currencyPipe: CurrencyPipe,   private suggestionService: SuggestionService,
) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  getSuggestions(): void {
  this.loading = true;
  this.suggestionsText = '';
  this.errorMessage = '';
  this.successMessage = '';

  const summary = {
    totalByCategory: this.getTotalByCategory(),
    averageMonthlySpending: this.getAverageSpending(),
    recurringExpenses: this.getRecurringExpenses()
  };

  this.suggestionService.getSuggestions(summary).subscribe({
    next: (res) => {
      this.suggestionsText = res.suggestions;
      this.loading = false;
    },
    error: () => {
      this.errorMessage = 'Erro ao obter sugestões.';
      this.loading = false;
    }
  });
}

getTotalByCategory(): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const t of this.transactions) {
    if (!totals[t.category]) totals[t.category] = 0;
    totals[t.category] += t.amount;
  }
  return totals;
}

getAverageSpending(): number {
  if (this.transactions.length === 0) return 0;
  const total = this.transactions.reduce((acc, t) => acc + t.amount, 0);
  const months = new Set(this.transactions.map(t => t.date.slice(0, 7))); // yyyy-MM
  return total / months.size;
}

getRecurringExpenses(): string[] {
  // Simplesmente detecta categorias que aparecem mais de 2x
  const freq: Record<string, number> = {};
  for (const t of this.transactions) {
    freq[t.category] = (freq[t.category] || 0) + 1;
  }
  return Object.keys(freq).filter(key => freq[key] >= 3);
}


  loadTransactions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar transações.';
        this.loading = false;
      }
    });
  }

  deleteTransaction(id?: number): void {
    if (!id) return;
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.successMessage = 'Transação excluída com sucesso!';
        this.loadTransactions();
      },
      error: () => {
        this.errorMessage = 'Erro ao excluir transação.';
        this.loading = false;
      }
    });
  }

  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL') || '';
  }
}
