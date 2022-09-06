import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultResponse } from '../models/default-response.model';
import { User } from '../models/user.model';
import { DataManagerService } from './data-manager.service';
import { StorageKeys } from './enums/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly BACKEND_BASE_URL: string = "https://tsb-portal.herokuapp.com"

  constructor(private http: HttpClient, public dataManager: DataManagerService) {}

  public getAsync(endpoint: string) {
    return this.http.get<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, { headers: this.getHeaders() })
  }

  public postAsync(endpoint: string, data: object) {
    return this.http.post<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, data, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    headers.delete('authorization');

    const token: any = this.dataManager.getData(StorageKeys.JWT_TOKEN);

    if (token) {
      headers =  headers.append('Authorization', token);
    }

    return headers;
  }
}
