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

import { InfoService } from '../services/info.service'; 

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.css']
})
export class UpdateNameComponent implements OnInit {
  visibleStatus:false;
  first_name:any;
  last_name:any;
  updateNameForm: FormGroup;  
  isSubmitted:boolean=false;
  constructor(private fb: FormBuilder,public infoService: InfoService,private snackbar: MatSnackBar,private router: Router) {

       this.updateNameForm = this.fb.group({
                   
                   
                   first_name: new FormControl('',[Validators.required]),                
                   
                   last_name: new FormControl('',[Validators.required])
                    });

   }

  ngOnInit() {
    this.getNameDetails();
  }

  /*
 * This function is used for fetch name data  
 */

  getNameDetails(){
    //this will enable after live api url created
    /* this.infoService.getBirthListDetails().subscribe(getnamedetails => {
       console.log("ok");

   });*/
  }

  /*
 * This function is used for save name change data
 * @params(
   first name:string,
   last name:string 


   ) 
 */
  updateNameFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.updateNameForm.valid)
      {
       
       let saveData = this.updateNameForm.value; 
       console.log("saveData"+JSON.stringify(saveData));
          //this will enable after live api url created
         /*this.infoService.saveUserDetails(saveData).pipe(first()).subscribe(updatenameresult => {
                    
                    if(updatenameresult.status.status_code == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Saved successful!','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        }).onAction()
                          .subscribe(() => this.router.navigateByUrl('my-info'));                  

                      
                       
                      }
                      else if(updatenameresult['status'].status_code == 400 || updatenameresult['status'].status_code==401){
                         this.snackbar.open(updatenameresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                       else{   

                       

                        this.snackbar.open(updatenameresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                       
                    } 
                 });*/
                      
                    
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
                          return this.updateNameForm.controls;
                     }

}
