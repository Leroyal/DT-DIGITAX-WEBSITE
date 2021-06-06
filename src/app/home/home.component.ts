import { Component, OnInit,ViewChild,NgModule } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';

import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { Routes, RouterModule,Router } from '@angular/router';

import * as uuid from 'uuid';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 submitted:boolean=false;
 flag:string;
 title:string;
 privacy_title:string;
 phone_codes:any;
 cookieValue:any;
 myId:any;


  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
               private router: Router,
               private cookieService: CookieService
               ) { }

   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required]),
				       password: new FormControl('',[Validators.required]),
				       remember_me: new FormControl('')
				    });

    get f() { return this.loginForm.controls; } 	           

  ngOnInit() {
    this.phone_codes= environment.phone_code;
    this.title=environment.title;
    this.privacy_title=environment.privacy_title;
  }

/*
 * This function is used for login
 * @params(email:string,password:string) 
 */
   loginsubmit() {
     console.log("ok");
     this.submitted = true;
     
      if (this.loginForm.valid) { 
        console.log(this.loginForm.value); 

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
        if(this.flag=="username" || this.flag=="email"){


        this.cookieValue=this.cookieService.get('userCookieId');
        console.log("home cookie"+this.cookieValue);
         if(!this.cookieValue){
         this.myId = uuid.v4();
         this.cookieService.set( 'userCookieId', this.myId,6 );
         }
         else{
          this.myId=this.cookieValue;
         }

        this.authService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value,this.flag,this.myId)
            .pipe(first())
            .subscribe(
                loginresponse => {
                console.log("###");
                console.log(loginresponse);
                if(loginresponse.status.status_code == 200)
                    {
                        this.snackbar.open(loginresponse.status.message,'OK',{
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
                    console.log("kll") 
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
/*
 * This configuration is used for testimonial section slider 
 */
 slideConfig = {"slidesToShow": 3, "slidesToScroll": 1, "autoplay": true, "autoplaySpeed": 3000, "dots": true, "infinite": true,
  responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1
        }
      }
    ]
 }
 slickInit(e) {
    console.log('slick initialized');
  }
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
