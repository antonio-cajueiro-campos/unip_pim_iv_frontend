import { ElementRef, Injectable } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { InsurancePlan } from '../models/insurance-plan.model';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private request: RequestService) { }

  renderPaypalPayment( insurancePlan: InsurancePlan) {
    var { total } = insurancePlan

    render({
      id: "#paypalButtons",
      currency: "BRL",
      value: total.toString(),
      onApprove: (details) => {
        console.log(details);
        
        alert("transacao feita")
      }
    })
  }

  public async pay(ip: InsurancePlan) {
    console.log(ip);
    
    await this.request.postAsync("/insurance/pay", ip, (data: any): void => {      
      console.log(data);      
    });
  }
}
