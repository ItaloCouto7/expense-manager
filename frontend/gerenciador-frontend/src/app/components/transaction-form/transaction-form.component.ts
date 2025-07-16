import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService, ITransaction } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class TransactionFormComponent {

  @Output() transactionAdded = new EventEmitter<void>();

  transactionForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      type: ['entrada', Validators.required],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      date: [this.getTodayDate(), Validators.required],
    });
  }

  getTodayDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

   submit() {
    if (this.transactionForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const transaction: ITransaction = this.transactionForm.value;

    this.transactionService.addTransaction(transaction).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Transação adicionada com sucesso!';
        this.transactionForm.reset({
          type: 'entrada',
          category: '',
          amount: '',
          description: '',
          date: this.getTodayDate()
        });
        this.transactionAdded.emit();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao adicionar a transação. Tente novamente.';
      }
    });
  }
}
