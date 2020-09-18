import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { PasswordValidator } from '../signup/password.validator';

import { MustMatch } from './match.validator';

import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as moment from 'moment';


import { NgxSpinnerService } from "ngx-spinner"; 

import { ContactService } from '../services/contact.service'; 


declare var grecaptcha: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  captcha?: string;
 errormsg: string;
 window: any;
 rec_response:any;
 grecaptcha:any;
 score:any;
 title:string;
 currentYear:number;
 signupMessage:string;
 privacy_title:string;

 teams: any[] = [
    { name: 'Liverpool' },
    { name: 'Manchester City' },
    { name: 'Manchester United' },
    { name: 'Arsenal' },
    { name: 'Leicester City' },
    { name: 'Chelsea' },
    { name: 'Tottenham Hotspur' },
];


subjects: any[] = [
    { name: 'Bug' },
    { name: 'Billing' },
    { name: 'Data Privacy Rights' },
    { name: 'Data Storage' },
    { name: 'Other' }
    
];


  public recentToken: string = '';
  public readonly executionLog: OnExecuteData[] = [];

  private allExecutionsSubscription: Subscription;
  private singleExecutionSubscription: Subscription;

  
  contactForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
               private recaptchaV3Service: ReCaptchaV3Service,
               private router: Router,
               private spinner: NgxSpinnerService,
               public contactService: ContactService
               
  	           )
               {

                   this.contactForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: new FormControl('',[Validators.required]),

            state: new FormControl('',[Validators.required]),

                   subject: new FormControl('',[Validators.required]), 
           
            confirm_email: ['', Validators.required]
        }, {
            validator: MustMatch('email', 'confirm_email')
        });












  	               /*this.contactForm = this.fb.group({
                   email: new FormControl('',[Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]) ]),
                   //captcha: new FormControl('',[Validators.required]),
                   first_name: new FormControl('',[Validators.required]), 
                   last_name: new FormControl('',[Validators.required]),
                   message: new FormControl('',[Validators.required]), 

                   confirm_email: new FormControl('',[Validators.required]), 

                  

                   state: new FormControl('',[Validators.required]),

                   subject: new FormControl('',[Validators.required])

                   
                  
                    },
                    {
            validator:
                MustMatch('email', 'confirm_email')

            
        }
                    );|*/


                     
  	            }
  ngOnInit() {
  }

  matchingEmailsValidator(emailKey: string, confirmEmailKey: string) {
        return (group: FormGroup): {[key: string]: any} => {

            let email = group.controls[emailKey];
            let confirmEmail = group.controls[confirmEmailKey];

            if (email.value !== confirmEmail.value) {
                return {
                    mismatch: true
                };
            }
        };
    }

  get f(){
                          return this.contactForm.controls;
                     }


  contactFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.contactForm.valid)
      {
       this.spinner.show();
       let saveData = this.contactForm.value; 

       console.log("saveData"+JSON.stringify(saveData));  
        
                   this.contactService.saveUserDetails(saveData).pipe(first()).subscribe(contactres => {
                    
                    if(contactres.status.status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('contact-us'));                  

                      
                       
                      }
                      else if(contactres['status'].status_code == 400 || contactres['status'].status_code==401){
                         this.snackbar.open(contactres['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(contactres['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });
                      
                    
       ;

              this.spinner.hide();
                   

       
      }
      else
      {
        this.snackbar.open('Some fields are mandatory','OK',{
            verticalPosition: 'top',
            horizontalPosition:'right'
          });
          this.spinner.hide();
      }
      
    }                     





}
