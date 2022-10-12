import { Injectable } from '@angular/core';
import { DefaultResponse } from '../models/default-response.model';
import { PriceSelector } from '../models/price-selector.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private request: RequestService) { }

  public async getPriceSelectorList(): Promise<PriceSelector[]> {
    var data = null;
    
    await this.request.getAsync("/insurance/getPriceSelectors", (response: DefaultResponse): void => {
      console.log(response);
      
      data = response.data.priceSelectorList as PriceSelector[];
    });

    return data;
  }
}
