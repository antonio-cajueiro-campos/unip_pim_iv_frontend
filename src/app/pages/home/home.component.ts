import { Component, OnInit } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { Selector } from 'src/app/models/selector.model';
import { PortalService } from 'src/app/services/portal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public priceSelectorList: PriceSelector[]

  constructor(private portalService: PortalService) {
  }
  
  async ngOnInit() {
    this.priceSelectorList = await this.portalService.getPriceSelectorList()
  }

}

