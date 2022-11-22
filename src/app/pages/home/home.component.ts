import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public messageService: MessageService) {
  }
  
  ngOnInit() {
    
  }

  showInfo(type: string){
    switch(type){
      case 'IRE': this.messageService.showServiceDescription('Cobertura contra Incêndio, Raio e Explosão', 'Seu imóvel pegou fogo fora de controle? Com essa cobertura, você recebe a indenização no valor do dano de acordo com o limite definido por você mesmo na hora de contratar seu seguro. O seguro cobre queda de raios ou explosões que danifiquem sua casa ou apê também. ;)'); return;
      case 'PPA': this.messageService.showServiceDescription('Cobertura Perda ou Pagamento de Aluguel', 'Se você mora de aluguel e acontecer algum incêndio, explosão ou outro evento que te impeça de ficar morando na casa por um tempo, essa cobertura garante o pagamento de outro aluguel, em outro local, pra você morar por até seis meses. :D'); return;
      case 'VGC': this.messageService.showServiceDescription('Cobertura contra Vendaval, Granizo e Ciclones', 'Força maior que a da natureza não tem, hein! Aqui você pode contar com essa cobertura se algum desastre natural prejudicar seu imóvel, como vendavais, ciclones, tornados e até chuva de granizo. É melhor ter a certeza de que tudo vai ficar numa boa com o bem mais precioso pra você. ;)'); return;
      case 'RCF': this.messageService.showServiceDescription('Cobertura Responsabilidade Civil Familiar', 'Com a Responsabilidade Civil Familiar você fica assegurado de incidentes que não foram necessariamente causados por alguém, como um vazamento que danifica o imóvel vizinho. A cobertura inclui ainda os acidentes provocados por animais domésticos, crianças e empregados domésticos. :D'); return;
      case 'DE': this.messageService.showServiceDescription('Cobertura contra Danos Elétricos', 'Se cair um raio ou rolar um acidente elétrico mais grave no imóvel segurado, queimando eletrodomésticos, máquinas e instalações, essa cobertura indeniza o valor do prejuízo, de acordo com o máximo definido por você no seu seguro online. Quer um jeito rápido e econômico de deixar seus bens numa boa? Tá na mão! ;)'); return;
      case 'RB': this.messageService.showServiceDescription('Cobertura contra Roubos ou Furtos', 'Se sua casa ou seus bens forem roubados, não dá pra ficar no prejuízo, né! :( Esta cobertura te ajuda a recuperar os valores dos bens perdidos, pagando o valor do seu prejuízo de acordo com o teto que você mesmo definir no seu seguro residencial – uma forma de diminuir o prejuízo e repor seus bens de um jeito mais fácil. :D'); return;
    }
  }
}


