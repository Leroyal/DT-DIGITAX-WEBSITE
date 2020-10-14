import { BirthService } from '../services/birth.service'; 

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

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  visibleStatus:false;
  updateAddressForm: FormGroup;  
  isSubmitted:boolean=false;
  country:any;
  address1:any;
  address2:any;
  city:any;
  state:any;
  zip:any;
  
  
  constructor(public birthService: BirthService,
  private fb: FormBuilder,
  private snackbar: MatSnackBar,
  private router: Router) {
       this.updateAddressForm = this.fb.group({
                   address1: new FormControl('',[Validators.required]),
                   address2: new FormControl('',[Validators.required]),
                   country: new FormControl('',[Validators.required]),
                   state: new FormControl('',[Validators.required]),
                   city: new FormControl('',[Validators.required]),
                   zip: new FormControl('',[Validators.required])                      
                   
                  
                    });
   }

  ngOnInit() {
    this.getAddressDetails();
  }

   getAddressDetails(){
      //this will enable after live url created
     /*this.birthService.getAddressListDetails().subscribe(addressdetails => {
       console.log("ok");

   });*/
  }

  /*
 * This function is used for save address data
 * @params(
   address1:string,
   address2:string,
   country:string,
   state:string,
   city:string,
   zip:string

   ) 
 */

   updateAddressFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updateAddressForm.valid)
      {
       
       let saveData = this.updateAddressForm.value; 
       console.log("saveData"+JSON.stringify(saveData));
       //this will enable after live api url created
       /*this.birthService.saveAddressDetails(saveData).pipe(first()).subscribe(updateaddressresult => {
                    
                    if(updateaddressresult.status.status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('my-info'));                  

                      
                       
                      }
                      else if(updateaddressresult['status'].status_code == 400 || updateaddressresult['status'].status_code==401){
                         this.snackbar.open(updateaddressresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updateaddressresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });*/
       }
  }

}
