import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestions(summary: any): Observable<{ suggestions: string }> {
    return this.http.post<{ suggestions: string }>('http://localhost:8000/api/suggestions', { summary });
  }
}
