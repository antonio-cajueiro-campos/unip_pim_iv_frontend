import { Component, OnInit } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public priceSelectorList: PriceSelector[]
  public total: number = 0;

  constructor(private insuranceService: InsuranceService) {
  }
  
  async ngOnInit() {
    this.priceSelectorList = await this.insuranceService.getPriceSelectorList()
  }

}

