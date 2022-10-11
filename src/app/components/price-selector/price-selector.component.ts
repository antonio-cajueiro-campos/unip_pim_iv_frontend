import { Component, Input, OnInit } from '@angular/core';
import { Selector } from 'src/app/models/selector.model';

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss'],
})
export class PriceSelectorComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() list: Selector[];
  @Input() total: number;

  public selected: Selector;

  constructor() { }

  ngOnInit() {}

}
