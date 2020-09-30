import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  
  otpVerificationForm: FormGroup;  
  isSubmitted:boolean=false;
  phoneNumberStorage:any;
  constructor(
  public authService: AuthService,
  private fb: FormBuilder,
  private snackbar: MatSnackBar,
  private router: Router) { 
      this.otpVerificationForm = this.fb.group({
                   verify_code: new FormControl('',[Validators.required])                   
                  
                    });
  }

  ngOnInit() {
    this.phoneNumberStorage=
     localStorage.getItem('user_phone').substr(localStorage.getItem('user_phone').length - 4);
  }
  
    /*
      * This function is used for compare user otp verification code
 
    */
    otpVerifyFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.otpVerificationForm.valid)
      {

         let saveData = this.otpVerificationForm.value; 
          console.log("saveData"+JSON.stringify(saveData));

          this.snackbar.open('Invalid verification code','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
           //this will enable after live api url created             
          /*if(localStorage.getItem('sent_otp')==saveData.verify_code){
             
          }
          else{
              this.snackbar.open('Invalid verification code','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
          }*/



      }

      }

   

}
