import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SuggestionData {
  analise: string;
  sugestoes: {
    id: number;
    titulo: string;
    descricao: string;
  }[];
  economia_estimada: string;
}

export interface SuggestionResponse {
  success?: boolean;
  data?: SuggestionData;
  suggestions?: string;
}


@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  constructor(private http: HttpClient) {}

  getSuggestions(summary: any): Observable<SuggestionResponse> {
    return this.http.post<SuggestionResponse>('http://localhost:8000/api/suggestions', { summary });
  }
}
