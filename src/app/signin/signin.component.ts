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

import * as uuid from 'uuid';

import { CookieService } from 'ngx-cookie-service';


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
    userArr:any;
    cacheVisible:boolean=false;
    cachesubmitted:boolean=false;
    cache_email_show:boolean=false;
    cache_phone:any;
    cache_phone_code:any;
    cache_phone_show:boolean=false;
    firstFormGroup:any;
    cookieValue:any;
    myId:any;
    removeVisible:boolean=false;


  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
               private router: Router,
               private cookieService: CookieService
  	           ) 
               {
                

               }

  //cache form
   cacheForm = new FormGroup({
               cache_email:new FormControl('', [Validators.required/*,Validators.email*/]),
               cache_phone:new FormControl('', [Validators.required/*,Validators.email*/]),
               cache_password: new FormControl('',[Validators.required])
               
            }); 

  //login form
   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required/*,Validators.email*/]),
				       password: new FormControl('',[Validators.required]),
				       remember_me: new FormControl('')
				    });

    get f() { return this.loginForm.controls; }

    get cache() { return this.cacheForm.controls; }

  ngOnInit() {

    
    this.phone_codes= environment.phone_code;
    this.title=environment.title;
    this.currentYear= moment().year();
    this.privacy_title=environment.privacy_title;

    this.fetchLoginDevice();
  }
   /**
 * This function is used for fetching
 * login details w.r.t device 
 */

  fetchLoginDevice(){
    this.cookieValue=this.cookieService.get('userCookieId');
    console.log("this.cookieValue"+this.cookieValue);
    
  if(this.cookieValue){
    this.authService.getDeviceDetails(this.cookieValue).subscribe(logDetails => {
    

      console.log("ok"+JSON.stringify(logDetails["data"]));
      if(logDetails["status"].status_code==200)
        {
          this.userArr=logDetails["data"];
          if(this.userArr.length>0){
              this.cacheVisible=true;
               }
        }


    });
    }
  }
 /**
 * This function is used while clicking particular user in cache section 
 */
 userClick(username_click,user_phone_click){
   console.log("ok12"+username_click+user_phone_click)
   this.cacheForm.controls['cache_email'].setValue(username_click);

   this.cacheForm.controls['cache_phone'].setValue(user_phone_click);

   this.cache_phone_code=user_phone_click;
   this.cache_phone=this.cache_phone_code.substr(this.cache_phone_code.length - 2);
 }

 /**
 * This function is used for login
 * @params(email:string,password:string) 
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


  /**
 * This function is used for login in cache
 * @params(email:string,password:string) 
 */

  cachesubmit() {
     
     this.cachesubmitted = true;
      if (this.cacheForm.valid) { 
        console.log(this.cacheForm.value);
        console.log("this.cookieValue"+this.cookieValue);
        this.authService.login(this.cache.cache_email.value, this.cache.cache_password.value, false,this.flag,this.cookieService.get('userCookieId'))
            .pipe(first())
            .subscribe(
                cacheLoginResponse => {
                console.log("###");
                console.log(cacheLoginResponse);
                if(cacheLoginResponse.status.status_code == 200)
                    {
                        this.snackbar.open(cacheLoginResponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                      location.href = '/tax-prepare-profile';
                    }
                   else{
                     this.snackbar.open(cacheLoginResponse.status.message,'OK',{
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

 /** This is hit when user wants to login in different user id
 */
 differentUserClick(){
    console.log("different user click");
    this.cacheVisible=false;
 }
/** This is hit after phone codes click
 */
 
 otpVerify(){
    console.log("otp");

     localStorage.setItem('user_phone',this.cache_phone_code);
             
             ///call sms sending api
             this.authService.sendOTP(this.phone_codes+this.cache_phone_code)
            .pipe(first())
            .subscribe(
                otpResponse => {
                
                if(otpResponse.status.status_code == 200)
                    {                   
                        
                        
                        this.snackbar.open(otpResponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                      

                      this.router.navigate(['otp-verify'], { 
                      state: { password: this.cache.cache_password.value,flag:"cache" } 
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
 /** This is hit when user wants to remove account
 */
 
  removeUserClick(){
    console.log("different user click");
    this.removeVisible=true;
 }
 /** This is hit when user confirm to remove account
 */
    cacheDelete(index,user){
    console.log("cache user"+user+"ol"+index);
    this.userArr.splice(index, 1);
    this.authService.deleteDeviceDetails(this.cookieService.get('userCookieId'),user).subscribe(deleteDetails => {
    

      console.log("ok"+JSON.stringify(deleteDetails["data"]));
      if(deleteDetails["status"].status_code==200)
        {
          console.log("remove user details done")
        }


    });
    
 }
 /** This is hit when user completes remove account process
 */
 removeUserDone(){
   this.removeVisible=false; 
 }
}
