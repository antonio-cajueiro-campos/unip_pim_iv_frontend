import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompleteRegistration } from 'src/app/models/complete-registration.model';
import { ViaCEP } from 'src/app/models/viacep.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss'],
})
export class CompleteRegistrationComponent {

  public completeRegistration: CompleteRegistration = {
    telefone: "",
    cep: "",
    cidade: "",
    estado: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    chavePIX: ""
  }

  public inputs: ElementRef[] = [];

  @ViewChild('Telefone') telefone: ElementRef;
  @ViewChild('ChavePIX') chavePIX: ElementRef;
  @ViewChild('CEP') cep: ElementRef;
  @ViewChild('Estado') estado: ElementRef;
  @ViewChild('Cidade') cidade: ElementRef;
  @ViewChild('Bairro') bairro: ElementRef;
  @ViewChild('Rua') rua: ElementRef;
  @ViewChild('Numero') numero: ElementRef;
  @ViewChild('Complemento') complemento: ElementRef;

  constructor(public userService: UserService) { }

  viaCEPinfos(cep: string) {
    console.log(cep);
    if (cep.length == 8 || cep.length == 9) {
      this.userService.request.getViaCep(cep, (response: ViaCEP) => {
        this.rua.nativeElement.value = response.logradouro;
        this.bairro.nativeElement.value = response.bairro;
        this.cidade.nativeElement.value = response.localidade;
        this.estado.nativeElement.value = response.uf;
        this.completeRegistration.estado = response.uf;
        this.completeRegistration.rua = response.logradouro;
        this.completeRegistration.cidade = response.localidade;
        this.completeRegistration.bairro = response.bairro;
      })
    }
  }

  ngAfterViewInit() {
    this.inputs.push(this.complemento);
    this.inputs.push(this.numero);
    this.inputs.push(this.rua);
    this.inputs.push(this.bairro);
    this.inputs.push(this.cidade);
    this.inputs.push(this.estado);
    this.inputs.push(this.cep);
    this.inputs.push(this.chavePIX);
    this.inputs.push(this.telefone);
  }

  onSubmit() {
    this.userService.completeRegistration(this.completeRegistration, this.inputs);
  }

}
