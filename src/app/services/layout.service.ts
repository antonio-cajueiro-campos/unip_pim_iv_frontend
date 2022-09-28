import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public isLoading = new Subject<boolean>();

  constructor() { }

  public showLoader(active: boolean = true) {
    this.isLoading.next(active);
  }
  
  public hideLoader() {
    this.isLoading.next(false);
  }
}
