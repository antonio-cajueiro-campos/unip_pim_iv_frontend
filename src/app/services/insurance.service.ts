import { Injectable } from '@angular/core';
import { InsurancePlan } from '../models/insurance-plan.model';
import { PriceSelector } from '../models/price-selector.model';
import { HistorySinistro } from '../models/sinistro-history.model';
import { DataManagerService } from './data-manager.service';
import { StorageKeys } from './enums/storage-keys';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  public insurancePlan: InsurancePlan;

  constructor(private request: RequestService, public dataManagerService: DataManagerService) {
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

  public async getHistorySinistro(): Promise<HistorySinistro[]> {
    var historySinistro: HistorySinistro[] = [];
    var info = this.dataManagerService.getData(StorageKeys.INFOS)

    await this.request.getAsync(`/insurance/gethistoricosinistros/${info.user.id}`, (data: any): void => {
      historySinistro = data.sinistros as HistorySinistro[];
    });

    return historySinistro;
  }
}
