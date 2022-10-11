import { Component, OnInit } from '@angular/core';
import { Selector } from 'src/app/models/selector.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public listA: Selector[] = [
    { 
      value: "abc", 
      text: "abc" 
    },
    { 
      value: "def", 
      text: "def" 
    }
  ]

  public listB: Selector[] = [
    {
      value: "tuv",
      text: "tuv"
    },
    { 
      value: "xyv", 
      text: "xyv" 
    }
  ]

  constructor() { }

  ngOnInit() {}

}

