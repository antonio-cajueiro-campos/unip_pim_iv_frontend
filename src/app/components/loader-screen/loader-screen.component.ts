import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-loader-screen',
  templateUrl: './loader-screen.component.html',
  styleUrls: ['./loader-screen.component.scss'],
})
export class LoaderScreenComponent implements OnInit {

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {}

}
