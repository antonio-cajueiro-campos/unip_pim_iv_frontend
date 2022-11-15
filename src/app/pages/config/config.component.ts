import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Infos } from 'src/app/models/Infos.model';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {

  public inputs: ElementRef[] = [];

  public infos: Observable<Infos>;

  constructor(public userService: UserService) {
    userService.infos$.pipe(
      tap(infos => {        
        this.infos = of(infos);
      })
    ).subscribe();
  }  

  ngAfterViewInit() {
  }

  onSubmit() {    
    //this.userService.updateUserInfos(this.credentials, this.inputs);
  }

}
