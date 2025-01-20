import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiBaseUrl = 'https://staging-fha-2024.occamlab.com.sg/api/';

  constructor(private http: HttpClient) {}

  fetchData(): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
