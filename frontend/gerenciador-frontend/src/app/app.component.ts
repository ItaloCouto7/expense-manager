import { Component } from '@angular/core';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@Component({
  selector: 'app-root',
  imports: [TransactionListComponent, TransactionFormComponent, SuggestionsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true
})
export class AppComponent {
   suggestionsText: string = '';
  title = 'gerenciador-frontend';
}
