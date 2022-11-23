import { Component, Input, OnInit } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { BudgetComponent } from 'src/app/pages/budget/budget.component';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss'],
})
export class PriceSelectorComponent implements OnInit {

  @Input() priceSelector: PriceSelector;

  constructor(public budgetComponent: BudgetComponent) { }

  ngOnInit() {
  }

  updateTotal() {
    console.log(this.priceSelector.id)
    this.budgetComponent.updateValues();
  }

}
