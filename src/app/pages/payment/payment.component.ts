import { Component, OnInit } from '@angular/core';
import { InsurancePlan } from 'src/app/models/insurance-plan.model';
import { PaypalService } from 'src/app/services/paypal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  public insurancePlan: InsurancePlan = {
    value: "6.00"
  };

  constructor(public userService: UserService, public paypalService: PaypalService) {
    //this.userService.dataManager.getData
  }
  
  ngOnInit() {
    this.paypalService.renderPaypalPayment(this.insurancePlan);
    // verificar se o usuário tem conta ativa, conta pendente ou conta desativada
  }
}
