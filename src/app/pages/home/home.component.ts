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
      case 'IRE': this.messageService.showServiceDescription('Titulo', 'um texto bem bonito e formoso pra gente testar aqui essa hora'); return;
      case 'PPA': this.messageService.showServiceDescription('Teste', ''); return;
      case 'VGC': this.messageService.showServiceDescription('Incêndio, raio e explosão', ''); return;
      case 'RCF': this.messageService.showServiceDescription('Incêndio, raio e explosão', ''); return;
      case 'DE': this.messageService.showServiceDescription('Incêndio, raio e explosão', ''); return;
      case 'RB': this.messageService.showServiceDescription('Incêndio, raio e explosão', ''); return;
    }
  }
}


