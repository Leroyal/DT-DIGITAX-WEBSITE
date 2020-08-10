import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordValidator } from './password.validator';

import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';


declare var grecaptcha: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
 captcha?: string;
 errormsg: string;
 window: any;
 rec_response:any;
 grecaptcha:any;


  public recentToken: string = '';
  public readonly executionLog: OnExecuteData[] = [];

  private allExecutionsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;

  
  signupForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
               private recaptchaV3Service: ReCaptchaV3Service
  	           )
               {
  	               this.signupForm = this.fb.group({
                   email: new FormControl('',[Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]) ]),
                   //captcha: new FormControl('',[Validators.required]),
                   user_id: new FormControl('',[Validators.required]),                   
                   password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]],
                   phone: new FormControl(''),
                    });


                     
  	            }


   
  ngOnInit() {

  
  	
  }
  

  addscript(){
     grecaptcha.ready(() => {
       grecaptcha.execute('6LePbq4UAAAAAPqwJU8u5g1Of1TIEMyoPpJQpyaD', { action: 'validate_captcha' }).then((token) => {
      console.log("okll"+token);
      this.rec_response=token;
    });
  });
    }

  /*
 * This function is used for signup
 * @params(email:string,password:string,user id:string,phone number:string)
 * As  no live api url found we are setting token static value  
 */
//https://www.google.com/recaptcha/api.js?render=put your site key here"
  signupFormSubmit(){
      this.isSubmitted = true;
       console.log("plo");
       
      
       /*const response = grecaptcha.getResponse();
      //console.log("forms"+response);
      if (response.length === 0) {
          console.log("not");
          this.errormsg = 'Recaptcha not verified. Please try again!';
           this.snackbar.open('Recaptcha not verified. Please try again!','OK',{
                verticalPosition: 'top',
                horizontalPosition:'right'
              });
          return;
        }*/
      if(this.signupForm.valid)
      {
      let saveData = this.signupForm.value;   
          grecaptcha.ready(() => {
              grecaptcha.execute('6LdoiLwZAAAAANJ-MV-ZORWzs8IwU1IjDPJcXnvn', { action: 'submit' }).then((token) => {
                console.log(token);
                    this.authService.captchaVerify(token).pipe(first()).subscribe(res => {
                       console.log("cateres"+res);
                     });
              });
          });  
        

        /*this.authService.SignUp(saveData).pipe(first()).subscribe(res => {
          if(res['status'].status_code == 201)
            {
             this.snackbar.open('Registered successfully','OK',{
		            verticalPosition: 'top',
		            horizontalPosition:'right'
		          });
             location.href = 'signin';
             
            }
          else{
            console.log("lko");
             confirm('Sorry, an error occurred. Please email support@digitaltaxusa.com');
             
          } 
         });*/
      }
      else
      {
        this.snackbar.open('Some fields are mandatory','OK',{
            verticalPosition: 'top',
            horizontalPosition:'right'
          });
      }
      
    }
   

    get f(){
                          return this.signupForm.controls;
                     }


  

  resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
                  
    public formatToken(token: string): string {
    if (!token) {
      return '(empty)';
    }

    return `${token.substr(0, 7)}...${token.substr(-7)}`;
  } 
 
}
