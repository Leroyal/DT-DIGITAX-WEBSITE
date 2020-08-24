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
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

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
 score:any;


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
                   username: new FormControl('',[Validators.required]),                   
                   password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]],
                   phone: new FormControl(''),
                    });


                     
  	            }


   
  ngOnInit() {
    this.loadExternalScript(environment.autoload);
  
  	
  }
  public loadExternalScript(url: string) {
  const body = <HTMLDivElement> document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = true;
  script.defer = true;
  body.appendChild(script);
}

  

  /*
 * This function is used for signup
 * @params(email:string,password:string,user name:string,phone number:string)   
 */
  signupFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.signupForm.valid)
      {
       let saveData = this.signupForm.value;   
          grecaptcha.ready(() => {
              grecaptcha.execute(environment.site, { action: 'cta_signup' }).then((token) => {
                   console.log("get token"+token);
                  this.authService.captchaVerify(token).pipe(first()).subscribe(res => {                     

                       if(res['score'] >=0.5){                       
                            
                             this.authService.SignUp(saveData).pipe(first()).subscribe(signupres => {
                    
                    if(signupres.status.status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Registered successfully','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      location.href = 'tax-prepare-profile';
                       
                      }
                      else if(signupres['status'].status_code == 400){
                         this.snackbar.open(signupres['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       confirm(environment.error_message);
                       
                    } 
                 });
                      }
                       else{
                          /*show error message as recaptcha thresold value not ok*/
                          confirm(environment.error_message);
                       }
                     });

                
                   
              });
          });          

       
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
