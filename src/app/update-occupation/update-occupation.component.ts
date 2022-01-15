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
  selector: 'app-update-occupation',
  templateUrl: './update-occupation.component.html',
  styleUrls: ['./update-occupation.component.css']
})
export class UpdateOccupationComponent implements OnInit {
  visibleStatus:false;
  updateOccupationForm: FormGroup;  
  isSubmitted:boolean=false;
  occupation:any;
  occupationVisible:boolean=false;
  fetchOccupation:any;

  constructor(public birthService: BirthService,private fb: FormBuilder,private snackbar: MatSnackBar,private router: Router) { 
     this.updateOccupationForm = this.fb.group({
                   
                   
                   occupation: new FormControl('',[Validators.required])            
                   
                  
                    });
  }

  ngOnInit() {
    this.getOccupationDetails();
  }
  /*
 * This function is used for fetch occupation data 
 */
  getOccupationDetails(){
    //we will enable it after live api url found
     this.birthService.getOccupationListDetails().subscribe(occupationdetails => {
       console.log("ok");
       this.fetchOccupation=occupationdetails["data"]["userDetails"]["userOcupation"];

       if(this.fetchOccupation){
           this.occupationVisible=true;
           this.updateOccupationForm.controls['occupation'].setValue(this.fetchOccupation);
       }
   });
  }

/*
 * This function is used for save occupation data
 * @params(
   occupation:string  

   ) 
 */
  updateOccupationFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updateOccupationForm.valid)
      {
       
       let saveData = this.updateOccupationForm.value; 
       console.log("saveData"+JSON.stringify(saveData));
        //we will enable it after live api url created
       this.birthService.saveOccupationDetails(saveData).pipe(first()).subscribe(updateoccupationresult => {
                    
                    if(updateoccupationresult["status"].status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('personal-info'));                  

                      
                       
                      }
                      else if(updateoccupationresult['status'].status_code == 400 || updateoccupationresult['status'].status_code==401){
                         this.snackbar.open(updateoccupationresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updateoccupationresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });
       }
  }

}
