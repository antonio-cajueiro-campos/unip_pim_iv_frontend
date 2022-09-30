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

  public readonly BACKEND_BASE_URL: string = "https://tsb-portal.herokuapp.com"

  constructor(private httpClient: HttpClient, private dataManager: DataManagerService) {}

  public getAsync = (endpoint: string, headers: string | Headers = null): Observable<DefaultResponse> =>
    this.httpClient.get<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, { headers: this.getHeaders(headers) });

  public postAsync = (endpoint: string, data: object, headers: string | Headers = null): Observable<DefaultResponse> =>
    this.httpClient.post<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, data, { headers: this.getHeaders(headers) });

  private getHeaders(headers: string | Headers = null): HttpHeaders {
    if (!headers)
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Show-Loader': 'true'
    }

    let httpHeaders = new HttpHeaders(headers);

    httpHeaders.delete('authorization');

    var jwt: Jwt = this.dataManager.getData(StorageKeys.JWT);
    
    if (jwt != null) {
      httpHeaders = httpHeaders.append('Authorization', jwt.token);
    }

    return httpHeaders;
  }
}

interface Headers {
  [name: string]: string | string[];
}
