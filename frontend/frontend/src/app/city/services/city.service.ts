import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
  private headers = {
    'X-RapidAPI-Key': '5f225997abmsh92baa92fa4ccfcap1c612cjsnbe84ab90e6f1',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  };

  constructor(private http: HttpClient) {}

  searchCities(query: string): Observable<any> {
    const params = new HttpParams()
      .set('namePrefix', query)
      .set('limit', '10');

    return this.http.get(this.apiUrl, { headers: this.headers, params });
  }
}

