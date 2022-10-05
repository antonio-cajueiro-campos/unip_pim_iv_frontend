import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { StorageKeys } from 'src/app/services/enums/storage-keys';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public userName: Observable<string>;

  constructor(public userService: UserService) {
    userService.infos$.pipe(
      tap(infos => {        
        this.userName = infos ? of(infos.user.name.split(" ")[0]) : of("Guest");
      })
    ).subscribe();
  }

  logout() {
    this.userService.logout();
  }
}
