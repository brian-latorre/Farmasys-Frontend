import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertaStockService {
  private apiUrl = 'http://localhost:8081/api/alertas';

  constructor(private http: HttpClient) {}

  obtenerAlertas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
