import { Component, OnInit } from '@angular/core';
import { InsurancePlan } from 'src/app/models/insurance-plan.model';
import { InsuranceService } from 'src/app/services/insurance.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {

  public insurancePlan: InsurancePlan;

  constructor(public insuranceService: InsuranceService, public userService: UserService, public paypalService: PaypalService) {
    this.insurancePlan = this.insuranceService.insurancePlan;
    console.log(this.insuranceService.insurancePlan);    
  }
  
  ngOnInit() {
    this.paypalService.renderPaypalPayment(this.insuranceService.insurancePlan);
    // verificar se o usuário tem conta ativa, conta pendente ou conta desativada
  }
}
