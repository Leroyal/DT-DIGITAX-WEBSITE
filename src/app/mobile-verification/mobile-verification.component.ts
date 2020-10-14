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
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css']
})
export class MobileVerificationComponent implements OnInit {
  mobileVerificationForm: FormGroup;  
  isSubmitted:boolean=false;

  constructor(public authService: AuthService,
  private fb: FormBuilder,
  private snackbar: MatSnackBar,
  private router: Router) {
       this.mobileVerificationForm = this.fb.group({
                   verify_mobile: new FormControl('',[Validators.required])                   
                  
                    });
   }

  ngOnInit() {
  }

  onNext(event) { 
     console.log("ok"+event);
  }

  /*
 * This function is used to save user verification preferences data
  
 */

   mobileVerifyFormSubmit(){
      this.isSubmitted = true;         
      
      
      if(this.mobileVerificationForm.valid)
      {

         let saveData = this.mobileVerificationForm.value; 
          console.log("saveData"+JSON.stringify(saveData));

          
           //this will enable after live api url created.             
           /*this.authService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value,this.flag)
            .pipe(first())
            .subscribe(
                loginresponse => {
                console.log("###");
                console.log(loginresponse);
                if(loginresponse.status.status_code == 200)
                    {
                        this.snackbar.open(loginresponse.status.status_message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                      location.href = '/tax-prepare-profile';
                    }
                   else{
                     this.snackbar.open(loginresponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                   }
                },
                error => {
                    this.snackbar.open(error,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                }); */



      }

      }

}
