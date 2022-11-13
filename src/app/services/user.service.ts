import { BehaviorSubject, Observable, of } from 'rxjs';
import { ElementRef, Injectable } from '@angular/core';
import { switchMap, catchError } from 'rxjs/operators';
import { Credential } from '../models/credential.model';
import { Jwt } from '../models/jwt.model';
import { Router } from '@angular/router';
import { DataManagerService } from './data-manager.service';
import { MessageService } from './message.service';
import { RequestService } from './request.service';
import { StorageKeys } from './enums/storage-keys';
import { HttpStatus } from './constants/http-status';
import { Infos } from '../models/Infos.model';
import { Register } from '../models/register.model';
import { CompleteRegistration } from '../models/complete-registration.model';

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

  public isLogged = (): Observable<boolean> =>
    (this.dataManager.getData(StorageKeys.INFOS) != null) ? of(true) : of(false);

  public loginUser = async (credential: Credential, inputs: ElementRef[]): Promise<boolean> =>
    await this.request.postAsync('/authenticate/login', credential, (data: any): void => {

      this.dataManager.setData(StorageKeys.JWT, data.jwt);
      this.getUserInfos().then(() => {
        this.router.navigateByUrl('/');
      });
    }, inputs);

  public registerUser = async (user: Register, inputs: ElementRef[]): Promise<boolean> =>
    await this.request.postAsync('/user/register', user, (data: any): void => {
      
      this.dataManager.setData(StorageKeys.JWT, data.jwt);
      this.getUserInfos().then(() => {
        this.router.navigateByUrl('/complete-registration');
      });
    }, inputs);

  public completeRegistration = async (user: CompleteRegistration, inputs: ElementRef[]): Promise<boolean> =>
    await this.request.postAsync('/user/complete-registration', user, (data: any): void => {
      this.getUserInfos().then(() => {
        this.message.toast("Cadastro completo!", "success")
        this.router.navigateByUrl('/');
      });

    }, inputs);

  public getUserInfos = async (): Promise<boolean> =>
    await this.request.getAsync('/user/infos', (data: any): void => {

      this.updateLocalInfos(data)
    });

  public updateUserInfos = async (infos: Infos): Promise<boolean> =>
    await this.request.postAsync('/user/infos', infos, (data: any): void => {

      this.updateLocalInfos(data);
      this.router.navigateByUrl('/profile');
    });


  public updateLocalInfos(data: Infos): void {
    this.dataManager.setData(StorageKeys.INFOS, data);
    this.infos.next(data)
  }

  public isTokenValid$(): Observable<boolean> {

    var result: Observable<boolean> = this.request.getCore('/authenticate/validate').pipe(
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

    var result: Observable<Jwt> = this.request.getCore('/authenticate/refresh_token').pipe(
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
    this.message.popupQuestion("Deseja sair?", "question", () => {
      this.dataManager.removeData(StorageKeys.INFOS)
      this.dataManager.removeData(StorageKeys.JWT)
      this.router.navigateByUrl('/login');
    }, () => {
      // cancelado
    }, { confirm: "Sair", cancel: "Ficar" })
  }
}
