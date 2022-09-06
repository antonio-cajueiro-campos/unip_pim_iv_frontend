import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let url: string = state.url;
      return this.checkUserLoginAndRoles(route, url);
  }

  public checkUserLoginAndRoles(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.userService.user != null) {
      var userRole: string = this.userService.user.role;

      if (userRole == route.data['role']) return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
