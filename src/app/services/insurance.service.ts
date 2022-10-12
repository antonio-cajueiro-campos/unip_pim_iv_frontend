import { Injectable } from '@angular/core';
import { PriceSelector } from '../models/price-selector.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private request: RequestService) { }

  public async getPriceSelectorList(): Promise<PriceSelector[]> {
    var priceSelectorList: PriceSelector[] = [];
    
    await this.request.getAsync("/insurance/getPriceSelectors", (data: any): void => {      
      priceSelectorList = data.priceSelectorList as PriceSelector[];
    });

    return priceSelectorList;
  }
}
