import { PriceSelectorComponent } from 'src/app/components/price-selector/price-selector.component';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { DataManagerService } from 'src/app/services/data-manager.service';
import { StorageKeys } from 'src/app/services/enums/storage-keys';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { Infos } from 'src/app/models/Infos.model';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
})
export class BudgetComponent implements OnInit {

  public priceSelectorList: PriceSelector[];
  public btnConfirmText = 'CONTRATAR';
  public btnDisabled = false;
  public valorResidencia = '';
  public dict = {}
  public infos: Observable<Infos>;

  @ViewChildren(PriceSelectorComponent) listItems: QueryList<PriceSelectorComponent>

  constructor(public insuranceService: InsuranceService, private router: Router, private messageService: MessageService, public dataManagerService: DataManagerService, public userService: UserService) { 
  }

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
    if (this.insuranceService.insurancePlan.total == 0) {
      this.messageService.toast("Valor mensal não pode ser zero", "error");
      return;
    }
    this.userService.infos$.pipe(
      tap(infos => {   
        this.infos = of(infos);
        if (infos?.endereco == null) {
          this.messageService.toast("Complete seu registro", "error");
          this.router.navigateByUrl('/complete-registration');
          console.log("não esta registrado")
        } else {
          this.router.navigateByUrl('/payment');
          this.dataManagerService.setData(StorageKeys.ValorFICTICIO, this.insuranceService.insurancePlan.total)
          console.log("tudo ok")
        }
      })
    ).subscribe();
  }

  calculateTotal(priceSelectorList: PriceSelector[]): number {

    var sum = 0;
    priceSelectorList.forEach(priceSelector => {
      var res = this.calcValorTaxa(priceSelector)
      this.dict[priceSelector.id] = res;
      sum += parseFloat(res.toFixed(2));
    })
    return sum;
  }

  Sanitize() {
    var sanitizeValue = this.valorResidencia.replace(/[^\d]/g, "")
    if (!sanitizeValue) {
      sanitizeValue = '0';
    } 
    return parseInt(sanitizeValue);
  }

  calcValorTaxa(priceSelector: PriceSelector) {
    const taxa = [1.2, 1.5, 1.9, 2.4]
    const DefaultV = (priceSelector.monthlyPayment / priceSelector.numberOfMonths)
    var finalValue: number;

    if (this.Sanitize() <= 250000) {
      finalValue = DefaultV;
    } else if (this.Sanitize() <= 500000) {
      finalValue = DefaultV * taxa[0];
    } else if (this.Sanitize() <= 750000) {
      finalValue = DefaultV * taxa[1];
    } else if (this.Sanitize() <= 1000000) {
      finalValue = DefaultV * taxa[2];
    } else {
      finalValue = DefaultV * taxa[3];
    }
    return finalValue;
  }

}
