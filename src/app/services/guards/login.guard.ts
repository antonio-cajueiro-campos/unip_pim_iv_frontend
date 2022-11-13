import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Infos } from 'src/app/models/Infos.model';
import { Jwt } from 'src/app/models/jwt.model';
import { DataManagerService } from '../data-manager.service';
import { StorageKeys } from '../enums/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private dataManagerService: DataManagerService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var jwt = this.dataManagerService.getData(StorageKeys.JWT) as Jwt;
    var infos = this.dataManagerService.getData(StorageKeys.INFOS) as Infos;

    if (jwt == null || infos == null) return true;

    this.router.navigateByUrl('/');
    return false;
  }
}
