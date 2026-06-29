import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercaderiaService {
  private apiUrl = 'http://localhost:8081/api/lotes/ingreso';

  constructor(private http: HttpClient) {}

  registrarIngreso(ingreso: any): Observable<any> {
    return this.http.post(this.apiUrl, ingreso);
  }
}
