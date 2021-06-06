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
  selector: 'app-update-birthday',
  templateUrl: './update-birthday.component.html',
  styleUrls: ['./update-birthday.component.css']
})
export class UpdateBirthdayComponent implements OnInit {
  visibleStatus:false;
  birth_date:any;
  updateBirthForm: FormGroup;  
  isSubmitted:boolean=false;
  fetchBirth:any;
  birthVisible:boolean=false;


  constructor(public birthService: BirthService,private fb: FormBuilder,private snackbar: MatSnackBar,private router: Router) {
     this.updateBirthForm = this.fb.group({
                   
                   
                   birth_date: new FormControl('',[Validators.required])            
                   
                  
                    });
   }

  ngOnInit() {
    this.getBirthDetails();
  }

  getBirthDetails(){
     //this will enable after live url created
     this.birthService.getBirthListDetails().subscribe(birthdetails => {
       console.log("ok");

       this.fetchBirth=birthdetails["data"]["userDetails"]["userDateofbirth"];

       if(this.fetchBirth){
           this.birthVisible=true;
           this.updateBirthForm.controls['birth_date'].setValue(this.fetchBirth);
       }
       


   });
  }

  /*
 * This function is used for save birthday  data
 * @params(
   birth_date:string   

   ) 
 */

  updateBirthFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updateBirthForm.valid)
      {
       
       let saveData = this.updateBirthForm.value; 
       console.log("saveData"+JSON.stringify(saveData));
       //this will enable after live url created
       this.birthService.saveBirthDetails(saveData).pipe(first()).subscribe(updatebirthresult => {
                    
                    if(updatebirthresult["status"].status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('personal-info'));                  

                      
                       
                      }
                      else if(updatebirthresult['status'].status_code == 400 || updatebirthresult['status'].status_code==401){
                         this.snackbar.open(updatebirthresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updatebirthresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });
       }
  }



}
