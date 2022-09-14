import { Observable, of } from 'rxjs';
import { ElementRef, Injectable, isDevMode } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Credential } from '../models/credential.model';
import { Jwt } from '../models/jwt.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { DataManagerService } from './data-manager.service';
import { MessageService } from './message.service';
import { RequestService } from './request.service';
import { StorageKeys } from './enums/StorageKeys';
import { HttpStatus } from './constants/http-status';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    public dataManager: DataManagerService,
    public request: RequestService,
    public message: MessageService
  ) { }

  public isLogged(): Observable<boolean> {
    if (this.dataManager.getData(StorageKeys.USER) != null)
      return of(true);
    else
      return of(false);
  }

  public login(credential: Credential, inputs: ElementRef[]): boolean {
    this.request.postAsync('/authenticate/login', credential).toPromise()
      .then(response => {

        if (!HttpStatus.OK(response))
          throw new Error(response.message);

        this.dataManager.setData(StorageKeys.JWT, response.data.jwt);

        this.getUserInfos();

      }).catch(response => {
        this.message.handleException(response, inputs);
        return false;
      });

    return true;
  }

  public register(user: User, inputs: ElementRef[]): boolean {
    this.request.postAsync('/user/register', user).toPromise()
      .then(response => {

        if (!HttpStatus.OK(response))
          throw new Error(response.message);

        this.dataManager.setData(StorageKeys.JWT, response.data.jwt);

        this.getUserInfos();

      }).catch(response => {
        this.message.handleException(response, inputs);
        return false;
      });

    return true;
  }

  public getUserInfos(): boolean {
    this.request.getAsync('/user/infos').toPromise()
      .then(response => {

        if (!HttpStatus.OK(response))
          throw new Error(response.message);

        this.dataManager.setData(StorageKeys.USER, response.data);
        this.router.navigateByUrl('/');

      }).catch(response => {
        this.message.handleException(response);
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

  // runTimeoutInterval(collaborator: Collaborator) {    
  //   const todaysDate = new Date().getTime();
  //   const expirationDate = collaborator.expiresIn.getTime();
  //   const timeInterval = expirationDate - todaysDate;

  //   this.timeoutInterval = setTimeout(() => {
  //     this.store.dispatch(logout());
  //     //logout functionality or get the refresh token
  //   }, timeInterval);
  // }

  public logout() {
    this.message.popup("Deseja sair?", "question", () => {
      this.dataManager.removeData(StorageKeys.USER)
      this.dataManager.removeData(StorageKeys.JWT)
      this.router.navigateByUrl('/login');
    })
  }
}
