import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Infos } from 'src/app/models/Infos.model';
import { DataManagerService } from '../data-manager.service';
import { StorageKeys } from '../enums/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class NotCompleteRegistrationGuard implements CanActivate {

  constructor(private dataManagerService: DataManagerService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var infos = this.dataManagerService.getData(StorageKeys.INFOS) as Infos;

    if (infos?.endereco == null) return true;

    this.router.navigateByUrl('/');
    return false;
  }
  
}
