import { Injectable } from '@angular/core';
import { InsurancePlan } from '../models/insurance-plan.model';
import { PriceSelector } from '../models/price-selector.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  public insurancePlan: InsurancePlan;

  constructor(private request: RequestService) {
    this.insurancePlan = {
      selectedPrices: [],
	    total: 0
    }
  }

  public async getPriceSelectorList(): Promise<PriceSelector[]> {
    var priceSelectorList: PriceSelector[] = [];
    
    await this.request.getAsync("/insurance/getPriceSelectors", (data: any): void => {      
      priceSelectorList = data.priceSelectorList as PriceSelector[];
    });

    return priceSelectorList;
  }
}
