import { Component, NgModule, OnInit,ViewChild } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

import { Routes, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {  
    phone_codes:any; 
    submitted:boolean=false;
    title:string;
    currentYear:number;
    flag:string;
    privacy_title:string;
    sentotp:any;

  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
               private router: Router
  	           ) 
               {
                

               }
  
   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required/*,Validators.email*/]),
				       password: new FormControl('',[Validators.required]),
				       remember_me: new FormControl('')
				    });

    get f() { return this.loginForm.controls; }

  ngOnInit() {

    
    this.phone_codes= environment.phone_code;
    this.title=environment.title;
    this.currentYear= moment().year();
    this.privacy_title=environment.privacy_title;
  }


 
 

 /*
 * This function is used for login
 * @params(email:string,password:string)
 * We are activating this one when live api url found
 */

  loginsubmit() {
     console.log("ok");
     console.log("sessionstore|"+sessionStorage.getItem('user_id'));
     this.submitted = true;
      if (this.loginForm.valid) { 
      	console.log(this.loginForm.value);

        /////////////////////
          if (this.f.email.value.indexOf('@') != -1) {
             console.log("email get");
             this.flag="email";
          }
          else if (this.f.email.value.match(/^[0-9()]+$/)) {
             console.log("phone number get");
             this.flag="phone";
             
             console.log("environment.phone_code"+this.phone_codes); 
             
             localStorage.setItem('user_phone',this.f.email.value);
             
             ///call sms sending api
             this.authService.sendOTP(this.phone_codes+this.f.email.value)
            .pipe(first())
            .subscribe(
                otpResponse => {
                //console.log("###");
                //console.log(otpResponse);
                if(otpResponse.status.status_code == 200)
                    {                      
                        
                        
                        this.snackbar.open(otpResponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                      

                      this.router.navigate(['otp-verify'], { 
                      state: { password: this.f.password.value } 
                    });
                    }
                   else{
                     this.snackbar.open(otpResponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                   }
                },
                error => {
                    this.snackbar.open(error,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                });              
              
          }
          else{
              console.log("username get");
              this.flag="username";
          }
        ///////////////////////

        if(this.flag=="username" || this.flag=="email"){
        this.authService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value,this.flag)
            .pipe(first())
            .subscribe(
                loginresponse => {
                console.log("###");
                console.log(loginresponse);
                if(loginresponse.status.status_code == 200)
                    {
                        this.snackbar.open(loginresponse.status.status_message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                      location.href = '/tax-prepare-profile';
                    }
                   else{
                     this.snackbar.open(loginresponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                   }
                },
                error => {
                    this.snackbar.open(error,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                });  


                }    
   }
   else
   {
     this.snackbar.open('Some fields are mandatory','OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
   }
 }

}
