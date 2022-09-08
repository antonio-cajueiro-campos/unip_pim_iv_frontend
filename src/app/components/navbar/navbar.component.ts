import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/services/enums/StorageKeys';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {}
  
  logout() {
    this.userService.logout();
  }

  getUserName() {
    var user = this.userService.dataManager.getData(StorageKeys.USER)
    return user.name.split(" ")[0];
  }
}
