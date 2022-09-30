import { Component, ElementRef, ViewChild } from '@angular/core';
import { Credential } from 'src/app/models/credential.model';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public credentials: Credential = {
    username: "",
    password: ""
  }

  public inputs: ElementRef[] = [];

  @ViewChild('Username') username: ElementRef;
  @ViewChild('Password') password: ElementRef;
  
  constructor(public userService: UserService, public layoutService: LayoutService) { }

  ngAfterViewInit() {
    this.inputs.push(this.password);
    this.inputs.push(this.username);
  }

  onSubmit() {    
    this.userService.loginUser(this.credentials, this.inputs);
  }
}
