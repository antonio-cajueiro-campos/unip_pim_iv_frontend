import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public isLoading = new Subject<boolean>();

  constructor() { }

  public showLoader() {
    this.isLoading.next(true);
  }
  
  public hideLoader() {
    this.isLoading.next(false);
  }
}
