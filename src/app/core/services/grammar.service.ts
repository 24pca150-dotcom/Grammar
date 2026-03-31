import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GrammarService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getCategories(flat: boolean = false): Observable<any[]> {
    const url = flat ? `${this.apiUrl}/categories?flat=1` : `${this.apiUrl}/categories`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() });
  }

  getQuestionsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}/questions`, { headers: this.getHeaders() });
  }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/questions/all`, { headers: this.getHeaders() });
  }

  getAdminStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/stats`, { headers: this.getHeaders() });
  }

  getAdminUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users`, { headers: this.getHeaders() });
  }

  getAnalyticsData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/xp-flow`, { headers: this.getHeaders() });
  }

  saveScore(data: any): Observable<any> {
    if (!this.isBrowser()) return EMPTY;
    return this.http.post(`${this.apiUrl}/scores`, data, { headers: this.getHeaders() });
  }

  // Admin CRUD for Categories
  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/categories`, category, { headers: this.getHeaders() });
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/categories/${id}`, category, { headers: this.getHeaders() });
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/categories/${id}`, { headers: this.getHeaders() });
  }

  // Admin CRUD for Questions
  createQuestion(question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/questions`, question, { headers: this.getHeaders() });
  }

  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/questions/${id}`, question, { headers: this.getHeaders() });
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/questions/${id}`, { headers: this.getHeaders() });
  }
}
