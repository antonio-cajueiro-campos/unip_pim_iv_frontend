import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-selector',
  templateUrl: './price-selector.component.html',
  styleUrls: ['./price-selector.component.scss'],
})
export class PriceSelectorComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {}

}
