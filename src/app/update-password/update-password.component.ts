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

import { PasswordValidator } from '../update-email/password.validator';


import { NgxSpinnerService } from "ngx-spinner";  

import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  visibleStatus:false;
  updatePasswordForm: FormGroup;  
  isSubmitted:boolean=false;
  new_password:any;
  confirm_password:any;
  old_password:any;

  constructor(private fb: FormBuilder,public infoService: InfoService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit() {
      this.updatePasswordForm = this.fb.group({
                   
                   
                   old_password: new FormControl('',[Validators.required]),

                   confirm_password: new FormControl('',[Validators.required]), 

                   new_password: ['', [Validators.required,Validators.minLength(6),PasswordValidator.cannotContainSpace]]               
                   
                   
                    }, {
            validator: MustMatch('new_password', 'confirm_password')
        });
  }
/*
 * This function is used for save password change data
 * @params(
   old password:string,
   new password:string,
   confirm password:string  

   ) 
 */
   updatePasswordFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updatePasswordForm.valid)
      {
       
       let saveData = this.updatePasswordForm.value; 
       console.log("saveData"+JSON.stringify(saveData));

         this.infoService.updatePassword(saveData).pipe(first()).subscribe(updatepasswordresult => {
                   console.log("api call");
                    
                    if(updatepasswordresult["status"]["status_code"] == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('We received your request to change your personal information and have sent you an email to verify these updates. You must verify these changes within 24 hours for them to take place.','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('signin-security'));                  

                      
                       
                      }
                      else if(updatepasswordresult['status'].status_code == 400 || updatepasswordresult['status'].status_code==401 || updatepasswordresult['status'].status_code==500){
                         this.snackbar.open(updatepasswordresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updatepasswordresult['status']['message'],'OK',{
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
                          return this.updatePasswordForm.controls;
                     }

}
