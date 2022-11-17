import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Infos } from 'src/app/models/Infos.model';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit{

  public inputs: ElementRef[] = [];

  public infos: Observable<Infos>;

  constructor(public userService: UserService, private route: ActivatedRoute) {
    userService.infos$.pipe(
      tap(infos => {        
        this.infos = of(infos);
      })
    ).subscribe();
  }  

  ngOnInit() {
    this.route.queryParams.pipe(
      tap( parametros => {
        if (parametros.scroll == 'mensalidade'){
          window.scrollTo({
            top: 500,
            behavior: 'smooth'
          });
        }
        return parametros;
      })
    ).subscribe()
  }

  onSubmit() {    
    //this.userService.updateUserInfos(this.credentials, this.inputs);
  }

}
