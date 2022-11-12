import { PriceSelectorComponent } from 'src/app/components/price-selector/price-selector.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {

  public priceSelectorList: PriceSelector[];

  @ViewChildren(PriceSelectorComponent) listItems: QueryList<PriceSelectorComponent>

  constructor(public insuranceService: InsuranceService, private router: Router) {}
  
  async ngOnInit() {
    this.priceSelectorList = await this.insuranceService.getPriceSelectorList()
    this.insuranceService.insurancePlan.total = this.calculateTotal(this.priceSelectorList);
  }

  updateValues() {    
    this.insuranceService.insurancePlan.selectedPrices = [];

    this.listItems.forEach((priceSelectorComponent: PriceSelectorComponent) => {
      this.insuranceService.insurancePlan.selectedPrices.push(priceSelectorComponent.priceSelector)
    })
    this.priceSelectorList = this.insuranceService.insurancePlan.selectedPrices;

    this.insuranceService.insurancePlan.total = this.calculateTotal(this.priceSelectorList);
  }
  
  async onSubmit() {
    this.updateValues();

    this.router.navigateByUrl('/payment');
  }

  calculateTotal(priceSelectorList: PriceSelector[]): number {
    var sum = 0;
    priceSelectorList.forEach(priceSelector => {
      var res = priceSelector.monthlyPayment / priceSelector.numberOfMonths;
      sum += parseFloat(res.toFixed(2));
    })
    return sum;
  }
}
