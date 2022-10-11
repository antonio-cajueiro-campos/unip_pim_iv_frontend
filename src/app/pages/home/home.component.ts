import { Component, OnInit } from '@angular/core';
import { PriceSelector } from 'src/app/models/price-selector.model';
import { Selector } from 'src/app/models/selector.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public priceSelectorList: PriceSelector[] = [
    {
      title: "Incêndio, raio e explosão",
      icon: "fire",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
    {
      title: "Perda e pagamento de aluguel",
      icon: "building",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
    {
      title: "Vendaval, granizo e ciclone",
      icon: "wind",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
    {
      title: "Responsabilidade civil familiar",
      icon: "user-group",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
    {
      title: "Danos elétricos",
      icon: "bolt",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
    {
      title: "Roubo",
      icon: "shield",
      list: [
        { 
          value: "abc", 
          text: "abc" 
        },
      ],
      total: 0
    },
  ]

  constructor() { }

  ngOnInit() {}

}

