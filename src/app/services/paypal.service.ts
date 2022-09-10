import { Injectable } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { InsurancePlan } from '../models/insurance-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor() { }

  renderPaypalPayment(insurancePlan: InsurancePlan) {
    var { value } = insurancePlan

    render({
      id: "#paypalButtons",
      currency: "BRL",
      value: value,
      onApprove: (details) => {
        console.log(details);
        
        alert("transacao feita")
      }
    })
  }
}
