import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PriceSelectorComponent } from 'src/app/components/price-selector/price-selector.component';
import { InsurancePlan } from 'src/app/models/insurance-plan.model';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PaypalService } from 'src/app/services/paypal.service';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {

  public priceSelectorList: PriceSelector[];

  @ViewChildren(PriceSelectorComponent) listItems: QueryList<PriceSelectorComponent>

  constructor(private insuranceService: InsuranceService, private router: Router) {}
  
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
      var flo = priceSelector.monthlyPayment / priceSelector.numberOfMonths;
      var flor = flo.toFixed(2);
      //sum = parseFloat(sum.toFixed(2))
      
      sum += parseFloat(flor);
    })
    return sum;
  }
}
