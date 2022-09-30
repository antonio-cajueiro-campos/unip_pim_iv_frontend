import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ElementRef, Injectable, isDevMode } from '@angular/core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Credential } from '../models/credential.model';
import { Jwt } from '../models/jwt.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DataManagerService } from './data-manager.service';
import { MessageService } from './message.service';
import { RequestService } from './request.service';
import { StorageKeys } from './enums/storage-keys';
import { HttpStatus } from './constants/http-status';
import { Infos } from '../models/Infos.model';
import { DefaultResponse } from '../models/default-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private infos: BehaviorSubject<Infos> = new BehaviorSubject<Infos>(null);
  public infos$ = this.infos.asObservable();

  constructor(
    private router: Router,
    private dataManager: DataManagerService,
    private request: RequestService,
    private message: MessageService
  ) {
    this.updateLocalInfos(this.dataManager.getData(StorageKeys.INFOS));
  }

  public isLogged(): Observable<boolean> {
    return (this.dataManager.getData(StorageKeys.INFOS) != null) ? of(true) : of(false);
  }

  public loginUser = (credential: Credential, inputs: ElementRef[]): boolean =>
    this.post('/authenticate/login', credential, inputs, (response: DefaultResponse): void => {

      this.dataManager.setData(StorageKeys.JWT, response.data.jwt);
      this.getUserInfos();
      this.router.navigateByUrl('/');
    });

  public registerUser = (user: User, inputs: ElementRef[]): boolean =>
    this.post('/user/register', user, inputs, (response: DefaultResponse): void => {

      this.dataManager.setData(StorageKeys.JWT, response.data.jwt);
      this.getUserInfos();
      this.router.navigateByUrl('/');
    });

  public getUserInfos = (): boolean =>
    this.get('/user/infos', (response: DefaultResponse): void =>
      this.updateLocalInfos(response.data)
    );

  public updateUserInfos = (infos: Infos): boolean =>
    this.post('/user/infos', infos, [], (response: DefaultResponse): void => {

      this.updateLocalInfos(response.data);
      this.router.navigateByUrl('/profile');
    });


  public updateLocalInfos(data: Infos): void {
    this.dataManager.setData(StorageKeys.INFOS, data);
    this.infos.next(data)
  }

  

  public post(endpoint: string, data: object, inputs: ElementRef[] = [], callback: Function) {
    this.request.postAsync(endpoint, data).toPromise()
      .then(response => {
        if (!HttpStatus.OK(response))
          throw new Error(response.message);
        callback(response);
      }).catch(response => {
        this.message.handle(response, inputs);
        return false;
      });
    return true;
  }

  public get(endpoint: string, callback: Function) {
    this.request.getAsync(endpoint).toPromise()
      .then(response => {
        if (!HttpStatus.OK(response))
          throw new Error(response.message);
        callback(response);
      }).catch(response => {
        this.message.handle(response);
        return false;
      });
    return true;
  }

  public isTokenValid$(): Observable<boolean> {

    var result: Observable<boolean> = this.request.getAsync('/authenticate/validate').pipe(
      switchMap(data => {
        if (HttpStatus.OK(data))
          return of(true);
        return of(false);
      }),
      catchError(e => {
        return of(false);
      })
    );

    return result;
  }

  public isRefreshTokenValid$(): Observable<Jwt> {

    let invalidToken: Jwt = {
      token: '',
      refreshToken: '',
      expirationTime: ''
    }

    var result: Observable<Jwt> = this.request.getAsync('/authenticate/refresh_token').pipe(
      switchMap(res => {
        if (!HttpStatus.OK(res)) return of(invalidToken);
        let jwt: Jwt = {
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          expirationTime: res.data.expirationTime
        }
        return of(jwt);
      }),
      catchError(e => {
        return of(invalidToken);
      })
    );

    return result;
  }

  public logout() {
    this.message.popup("Deseja sair?", "question", () => {
      this.dataManager.removeData(StorageKeys.INFOS)
      this.dataManager.removeData(StorageKeys.JWT)
      this.router.navigateByUrl('/login');
    })
  }
}
