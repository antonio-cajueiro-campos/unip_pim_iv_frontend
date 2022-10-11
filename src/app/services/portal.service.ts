import { Injectable } from '@angular/core';
import { DefaultResponse } from '../models/default-response.model';
import { PriceSelector } from '../models/price-selector.model';
import { HttpStatus } from './constants/http-status';
import { MessageService } from './message.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private request: RequestService, private message: MessageService) { }

  public async getPriceSelectorList(): Promise<PriceSelector[]> {
    var data = null;
    
    await this.get("/insurance/getPriceSelectors", (response: DefaultResponse): void => {
      console.log(response);
      
      data = response.data.priceSelectorList as PriceSelector[];
    });

    return data;
  }


  public async get(endpoint: string, callback: Function): Promise<boolean> {
    await this.request.getAsync(endpoint).toPromise()
      .then(response => {
        if (!HttpStatus.OK(response))
          throw new Error(response.message);        
        callback(response);
      }).catch(response => {
        this.message.handle(response);
        return false;
      });
    return true;
  }
}
