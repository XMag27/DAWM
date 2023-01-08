import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCovidService {

  constructor(private http: HttpClient) {}

  obtenerDatos() {
    return this.http.get('https://api.covid19api.com/summary');
  }
}
