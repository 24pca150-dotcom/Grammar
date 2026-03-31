import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:8000/api/modules';
  private moduleAddedSource = new Subject<void>();
  moduleAdded$ = this.moduleAddedSource.asObservable();

  constructor(private http: HttpClient) { }

  getModules(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createModule(moduleData: { name: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, moduleData).pipe(
      tap(() => this.moduleAddedSource.next())
    );
  }

  deleteModule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.moduleAddedSource.next())
    );
  }
}
