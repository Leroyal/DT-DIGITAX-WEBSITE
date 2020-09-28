import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin-security',
  templateUrl: './signin-security.component.html',
  styleUrls: ['./signin-security.component.css']
})
export class SigninSecurityComponent implements OnInit {
  emailStorage:string;
  constructor() { }

  ngOnInit() {
    this.emailStorage=(!localStorage.getItem('user_email')) ? sessionStorage.getItem('user_email') : localStorage.getItem('user_email');
    console.log("this.emailStorage"+this.emailStorage)
  }

}
