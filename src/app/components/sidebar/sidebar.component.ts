import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Infos } from 'src/app/models/Infos.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public role: Observable<string>;
  public infos: Observable<Infos>;

  constructor(public userService: UserService) {
    userService.infos$.pipe(
      tap(infos => {   
        this.infos = of(infos);
        console.log(infos?.endereco);
        
        this.role = infos ? of(infos.user.credential.role) : of("Cliente");
      })
    ).subscribe();
  }
  
  ngOnInit(): void {
  }
}
