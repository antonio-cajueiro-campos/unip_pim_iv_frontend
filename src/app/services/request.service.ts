import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../models/default-response.model';
import { Jwt } from '../models/jwt.model';
import { DataManagerService } from './data-manager.service';
import { StorageKeys } from './enums/storage-keys';
import * as signalR from '@microsoft/signalr';
import { HttpStatus } from './constants/http-status';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public BACKEND_BASE_URL: string = "https://tsb-portal.herokuapp.com"

  constructor(private httpClient: HttpClient, private dataManager: DataManagerService, private message: MessageService) {
    if (isDevMode) {
      // this.BACKEND_BASE_URL = "https://localhost:7042";
    }
  }

  public async getAsync(endpoint: string, callback: Function): Promise<boolean> {
    await this.getCore(endpoint).toPromise()
      .then(response => {
        if (!HttpStatus.OK(response))
          throw new Error(response.message);        
        callback(response.data);
      }).catch(response => {
        this.message.handle(response);
        return false;
      });
    return true;
  }

  public async postAsync(endpoint: string, data: object, callback: Function, inputs: ElementRef[] = []): Promise<boolean> {
    await this.postCore(endpoint, data).toPromise()
      .then(response => {
        if (!HttpStatus.OK(response))
          throw new Error(response.message);
        callback(response.data);
      }).catch(response => {
        this.message.handle(response, inputs);
        return false;
      });
    return true;
  }

  public getCore = (endpoint: string, headers: string | Headers = null): Observable<DefaultResponse> =>
    this.httpClient.get<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, { headers: this.getHeaders(headers) });

  public postCore = (endpoint: string, data: object, headers: string | Headers = null): Observable<DefaultResponse> =>
    this.httpClient.post<DefaultResponse>(this.BACKEND_BASE_URL + endpoint, data, { headers: this.getHeaders(headers) });

  public signalR(userId: number) {
    var jwt: Jwt = this.dataManager.getData(StorageKeys.JWT);
    
    if (jwt != null) {
      const options: signalR.IHttpConnectionOptions = {
        accessTokenFactory: () => {
          return jwt.token.replace("Bearer ", "");
        }
      };
      
      return new signalR.HubConnectionBuilder()
        .withUrl(`${this.BACKEND_BASE_URL}/websocketchat?userId=${userId}`, options)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Warning)
        .build();
    }
  }

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
