import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as moment from 'moment';

import { MustMatch } from '../contact-us/match.validator';

import { PasswordValidator } from './password.validator';


import { NgxSpinnerService } from "ngx-spinner";  

import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  visibleStatus:false;
  updateEmailForm: FormGroup;  
  isSubmitted:boolean=false;
  emailStorage:any;
  email:any;
  confirm_email:any;
  password:any;

  constructor(private fb: FormBuilder,public infoService: InfoService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit() {
     this.emailStorage=(!localStorage.getItem('user_email')) ? sessionStorage.getItem('user_email') : localStorage.getItem('user_email');

     this.updateEmailForm = this.fb.group({
                   
                   email: new FormControl('',[Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]) ]),

                   confirm_email: new FormControl('',[Validators.required]),

                   password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]]

                    }, {
            validator: MustMatch('email', 'confirm_email')
        });
  }
/*
 * This function is used for save email change data
 * @params(
   email:string,
   confirm email:string,
   password:string
   

   ) 
 */

     updateEmailFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updateEmailForm.valid)
      {
       
       let saveData = this.updateEmailForm.value; 
       console.log("saveData"+JSON.stringify(saveData));

         this.infoService.updateEmail(saveData).pipe(first()).subscribe(updateemailresult => {
                   console.log("api call");
                    
                    if(updateemailresult["status"]["status_code"] == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('We received your request to change your personal information and have sent you an email to verify these updates. You must verify these changes within 24 hours for them to take place.','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('signin-security'));                  

                      
                       
                      }
                      else if(updateemailresult['status'].status_code == 400 || updateemailresult['status'].status_code==401 || updateemailresult['status'].status_code==500){
                         this.snackbar.open(updateemailresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updateemailresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });
                      
                    
       ;
 

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
                          return this.updateEmailForm.controls;
                     }

}
