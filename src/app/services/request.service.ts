import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/default-response.model';
import { Jwt } from '../models/jwt.model';
import { DataManagerService } from './data-manager.service';
import { StorageKeys } from './enums/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly BACKEND_BASE_URL: string = "https://tsb-portal.herokuapp.com"

  constructor(private http: HttpClient, private dataManager: DataManagerService) {}

  public getAsync = (endpoint: string, headers: HttpHeaders = this.getHeaders()): Observable<DefaultResponse> =>
    this.http.get<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, { headers });

  public postAsync = (endpoint: string, data: object, headers: HttpHeaders = this.getHeaders()): Observable<DefaultResponse> =>
    this.http.post<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, data, { headers });

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Show-Loader': 'true'
    });

    headers.delete('authorization');

    var jwt: Jwt = this.dataManager.getData(StorageKeys.JWT);
    
    if (jwt != null) {
      headers =  headers.append('Authorization', jwt.token);
    }

    return headers;
  }
}
