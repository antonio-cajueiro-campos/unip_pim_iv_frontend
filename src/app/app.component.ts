import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { Observable, of, timer } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public isLoader: Observable<boolean>;

  constructor(public platform: Platform) {
    //this.initializeApp();
  }
  /*async initializeApp() {
    if (this.platform.is('android'))
    this.isLoader = of(true);

    of(true).pipe(
      delay(2000),
      tap(() => {
        this.isLoader = of(false);
      })).subscribe()

    this.platform.ready().then(() => {
    });
  }*/
}
