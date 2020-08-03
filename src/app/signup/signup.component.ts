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



declare var grecaptcha: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 //public formModel: FormModel = {};
 captcha?: string;
 errormsg: string;
 @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;
  
  signupForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
  	           )
               {
  	               this.signupForm = this.fb.group({
                   email: new FormControl('',[Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]) ]),
                   //captcha: new FormControl('',[Validators.required]),
                   user_id: new FormControl('',[Validators.required]),
                   phone: new FormControl('', [Validators.compose([
                                                                  Validators.minLength(10),
                                                                  Validators.pattern(/^-?(0|[1-9]\d*)?$/),
                                                                  Validators.required
                                                                ]) ]),
                   password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]],
                    });


                     
  	            }
  
  ngOnInit() {
    this.addRecaptchaScript();
  	
  }

  signupFormSubmit(){
      this.isSubmitted = true;
       const response = grecaptcha.getResponse();
      console.log("forms"+response);
      if (response.length === 0) {
          console.log("not");
          this.errormsg = 'Recaptcha not verified. Please try again!';
           this.snackbar.open('Recaptcha not verified. Please try again!','OK',{
                verticalPosition: 'top',
                horizontalPosition:'right'
              });
          return;
        }
      if(this.signupForm.valid)
      {
      let saveData = this.signupForm.value;
    
       //console.log("saveData"+document.getElementById('g-recaptcha-response').value);

        this.authService.SignUp(saveData).pipe(first()).subscribe(res => {
          if(res['status'].status_code == 201)
            {
             this.snackbar.open('Registered successfully','OK',{
		            verticalPosition: 'top',
		            horizontalPosition:'right'
		          });
             location.href = 'signin';
             // this.authService.login(saveData.email, saveData.password).pipe(first()).subscribe(resp => {
             //    if(resp.status == 1){
             //    location.href = '/dashboard';
             //    }
             // });
            }
          else{
            console.log("lko");
             confirm('Sorry, an error occurred. Please email support@digitaltaxusa.com');
             //confirm('Something went wrong');
          } 
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
    //6LeJqqsZAAAAAKaXJ0q65NRkbaos4hbYjCpiY5t5

    get f(){
                          return this.signupForm.controls;
                     }


    renderReCaptch() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : '6LePbq4UAAAAAPqwJU8u5g1Of1TIEMyoPpJQpyaD',
      'callback': (response) => {
          console.log(response);
          //console.log("recaptcha"+this.recaptcha.value);
          //this.signupForm.recaptchav3_token = response;    

      }
    });
  }
  
//https://www.google.com/recaptcha/api.js?render=reCAPTCHA_site_key
  addRecaptchaScript() {
 
    window['grecaptchaCallback'] = () => {
      this.renderReCaptch();
    }

    
 
    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptch(); return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));
 
  }

  resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
                  

}
