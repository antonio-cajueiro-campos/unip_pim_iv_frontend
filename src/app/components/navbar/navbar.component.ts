import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { StorageKeys } from 'src/app/services/enums/StorageKeys';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService, public dataManager: DataManagerService) { }

  ngOnInit(): void {}
  
  logout() {
    this.userService.logout();
  }

  getUserName() {
    var user = this.dataManager.getData(StorageKeys.USER)
    if (user != null)
    return user.name.split(" ")[0];
    else
      return "UserNotFound";
  }
}
