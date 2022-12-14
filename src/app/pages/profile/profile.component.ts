import { Component, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Infos } from 'src/app/models/Infos.model';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public infos: Observable<Infos>;

  constructor(public userService: UserService) {
    userService.infos$.pipe(
      tap(infos => {        
        this.infos = of(infos);
      })
    ).subscribe();
  }
}
