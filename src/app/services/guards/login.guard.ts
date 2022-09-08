import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataManagerService } from '../data-manager.service';
import { StorageKeys } from '../enums/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private dataManagerService: DataManagerService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var user = this.dataManagerService.getData(StorageKeys.USER);

    if (user == null) return true;

    this.router.navigateByUrl('/');
    return false;
  }
}
