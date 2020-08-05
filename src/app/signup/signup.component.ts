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
 captcha?: string;
 errormsg: string;
@ViewChild('g-recaptcha', {static: true }) recaptchaElement: ElementRef;
  
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
                  /* phone: new FormControl('', [Validators.compose([
                                                                  Validators.minLength(10),
                                                                  Validators.pattern(/^-?(0|[1-9]\d*)?$/),
                                                                  Validators.required
                                                                ]) ]),*/
                   password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]],
                   phone: new FormControl(''),
                    });


                     
  	            }
  
  ngOnInit() {
   this.addRecaptchaScript();
  	
  }
   /*
 * This function is used for signup 
 * @params(email:string,password:string,user id:string,phone number:string)  
 */
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

        this.authService.SignUp(saveData).pipe(first()).subscribe(res => {
          if(res['status'].status_code == 200)
            {
             this.snackbar.open('Registered successfully','OK',{
		            verticalPosition: 'top',
		            horizontalPosition:'right'
		          });
              location.href = '/dashboard';             
            }
          else{
            console.log("lko");
             confirm('Sorry, an error occurred. Please email support@digitaltaxusa.com');
            
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
   

    get f(){
              return this.signupForm.controls;
                     }

     /*
 * This function is used for rendering captcha 
 */
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
   /*
 * This function is used for captcha reload 
 */

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
