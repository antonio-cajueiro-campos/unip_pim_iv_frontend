import { Component, OnInit } from '@angular/core';
import { HistorySinistro } from 'src/app/models/sinistro-history.model';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-history-sinistro',
  templateUrl: './history-sinistro.component.html',
  styleUrls: ['./history-sinistro.component.scss'],
})
export class HistorySinistroComponent implements OnInit {

  public ArrayHistorySinistro: HistorySinistro[];
  public textResponse: string;

  constructor(public insuranceService: InsuranceService) { }

  async ngOnInit() {
    this.ArrayHistorySinistro = await this.insuranceService.getHistorySinistro();
    if (this.ArrayHistorySinistro.length == 0) {
      this.textResponse = "Histórico vazio..."
    } else {
      this.textResponse = ""
    }
  }

  formatarData(data: string): string {
    var dataArray = data.split("T")
    var dataDMA = dataArray[0].split("-")
    var dataHorario = dataArray[1].split(":")

    return `${dataDMA[2]}/${dataDMA[1]}/${dataDMA[0]}` + ' às ' + `${dataHorario[0]}h${dataHorario[1]}`
  }

  getTipoSinistro(tipoSinistro: string): string {
    switch (tipoSinistro) {
      case 'IRE': return 'Incêndio, raio e explosão.'
      case 'PP': return 'Perda e pagamento de aluguel.'
      case 'VGC': return 'Vendaval, granizo e ciclone.'
      case 'RCF': return 'Responsabilidade civil familiar.'
      case 'DE': return 'Danos elétricos.'
      case 'RO': return 'Roubos.'
      default: return 'Tipo de Sinistro não localizado.'
    }
  }

  getIconeSinistro(tipoSinistro: string): string {
    switch (tipoSinistro) {
      case 'IRE': return 'fa-fire'
      case 'PP': return 'fa-building'
      case 'VGC': return 'fa-wind'
      case 'RCF': return 'fa-user-group'
      case 'DE': return 'fa-bolt-lightning'
      case 'RO': return 'fa-shield'
      default: return ''
    }
  }

}
