import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = 'AIzaSyBXr1Vt-pDbTJ8Sd3ifRNHuWHcV5GBLYOk';
  private apiUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

  constructor(private http: HttpClient) { }

  getCityName(lat: number, lng: number): Observable<any> {
    const url = `${this.apiUrl}?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get(url);
  }

}
