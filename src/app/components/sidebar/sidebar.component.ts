import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public role: Observable<string>;

  constructor(public userService: UserService) {
    userService.infos$.pipe(
      tap(infos => {        
        this.role = infos ? of(infos.user.credential.role) : of("Cliente");
      })
    ).subscribe();
  }
  
  ngOnInit(): void {
  }
}
