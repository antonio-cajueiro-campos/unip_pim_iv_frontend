import { ElementRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';
import { InsurancePlan } from '../models/insurance-plan.model';
import { MessageService } from './message.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private router: Router, private request: RequestService, private messageService: MessageService) { }

  renderPaypalPayment(insurancePlan: InsurancePlan) {
    var { total } = insurancePlan

    render({
      id: "#paypalButtons",
      currency: "BRL",
      value: total.toString(),
      onApprove: (details) => {
        this.messageService.present("Transação realizada com sucesso!", "", "success")
        this.router.navigateByUrl("/profile")
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
