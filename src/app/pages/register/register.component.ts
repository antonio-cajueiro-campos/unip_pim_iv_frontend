import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Register } from 'src/app/models/register.model';
import { LayoutService } from 'src/app/services/layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public register: Register = {
    name: "",
    document: "",
    username: "",
    password: "",
    repassword: ""
  }

  public inputs: ElementRef[] = [];

  @ViewChild('Name') name: ElementRef;
  @ViewChild('Document') document: ElementRef;
  @ViewChild('Username') username: ElementRef;
  @ViewChild('Password') password: ElementRef;
  @ViewChild('Repassword') repassword: ElementRef;
  
  constructor(public userService: UserService, public layoutService: LayoutService) { }

  ngAfterViewInit() {
    this.inputs.push(this.repassword);
    this.inputs.push(this.password);
    this.inputs.push(this.username);
    this.inputs.push(this.document);
    this.inputs.push(this.name);
  }

  onSubmit() {
    this.userService.registerUser(this.register, this.inputs);
  }

}
