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


import { NgxSpinnerService } from "ngx-spinner"; 
import { MarketingService } from '../services/marketing.service';

@Component({
  selector: 'app-marketing-preferences',
  templateUrl: './marketing-preferences.component.html',
  styleUrls: ['./marketing-preferences.component.css']
})
export class MarketingPreferencesComponent implements OnInit {
    marketingForm: FormGroup;
    isSubmitted:boolean=false;
    color:any;

    
    public varboolean: boolean = true;

    public isContactViaMailDisabled: boolean = true;
    public isContactViaEmailDisabled: boolean = true;
    public isContactViaPhoneDisabled: boolean = true;

    
    public someValue:number;

  constructor(public marketingService: MarketingService,
    private fb: FormBuilder, 
  	private snackbar: MatSnackBar,private router: Router
  ) { 
                   this.marketingForm = this.fb.group({
                   email_option: new FormControl(''),

                   mail_option: new FormControl(''),                   
                   
                   phone_option: new FormControl(''),
                    });
  }

  ngOnInit() {
     
     this.getMarketingDetails();
  }

  /*
 * This function is used to fetch user marketing preferences data
  
 */
     
  getMarketingDetails(){
     this.marketingService.getMarketingDetails().subscribe(marketingdetails => {
       console.log("ok"+JSON.stringify(marketingdetails));

       if(marketingdetails["status"]["status_code"]==200){
        
        this.isContactViaMailDisabled=(marketingdetails["data"]["isContactViaMailDisabled"]=='false') ? false : true;
        

        
	    this.isContactViaEmailDisabled=(marketingdetails["data"]["isContactViaEmailDisabled"]=='false') ? false : true;
	    this.isContactViaPhoneDisabled=(marketingdetails["data"]["isContactViaPhoneDisabled"]=='false') ? false : true;        
       }

   });
  }

 /*
 * This function is used to save user marketing preferences data
  
 */
  marketingFormSubmit(){
     
     this.isSubmitted = true;         
      
      console.log("ok")
      if(this.marketingForm.valid)
      {
       
       let saveData = this.marketingForm.value; 
       console.log("saveData"+JSON.stringify(saveData));
       if(saveData.phone_option==null){            
            
            	saveData.phone_option=this.isContactViaPhoneDisabled;

            
            }

       if(saveData.mail_option==null){
             
            	saveData.mail_option=this.isContactViaMailDisabled; 

            }

       if(saveData.email_option==null){
            
            	saveData.email_option=this.isContactViaEmailDisabled;  

            }

                   
       this.marketingService.saveMarketingDetails(saveData).pipe(first()).subscribe(marketingSaveResult => {
                    
                    if(marketingSaveResult["status"]["status_code"] == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('marketing-preferences'));                  

                      
                       
                      }
                      else if(marketingSaveResult['status'].status_code == 400 || marketingSaveResult['status'].status_code==401){
                         this.snackbar.open(marketingSaveResult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(marketingSaveResult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });
       }

  }

}
