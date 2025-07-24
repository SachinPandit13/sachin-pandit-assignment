import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments';
 import { Response } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  get<T>(endpoint: string, params?: HttpParams): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${this.baseUrl}${endpoint}`, { params });
  }

  post<T, B>(endpoint: string, body: B): Observable<Response<T>> {
    return this.http.post<Response<T>>(`${this.baseUrl}${endpoint}`, body);
  }

  put<T, B>(endpoint: string, body: B): Observable<Response<T>> {
    return this.http.put<Response<T>>(`${this.baseUrl}${endpoint}`, body);
  }
}
