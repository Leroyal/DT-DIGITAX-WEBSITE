import { Component, NgModule, OnInit,ViewChild } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {  
   
    submitted:boolean=false;
    title:string;
    currentYear:number;

  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
  	           ) 
               {
                

               }
  
   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required,Validators.email]),
				       password: new FormControl('',[Validators.required]),
				       remember_me: new FormControl('')
				    });

    get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.title=environment.title;
    this.currentYear= moment().year();
  }
 

 /*
 * This function is used for login
 * @params(email:string,password:string)
 * We are activating this one when live api url found
 */

  loginsubmit() {
     console.log("ok");
     this.submitted = true;
      if (this.loginForm.valid) { 
      	console.log(this.loginForm.value);
        this.authService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value,)
            .pipe(first())
            .subscribe(
                resp => {
                console.log("###");
                console.log(resp);
                if(resp.status.status_code == 200)
                    {
                        this.snackbar.open(resp.status.status_message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                    }
                   else{
                    location.href = '/tax-prepare-profile';
                   }
                },
                error => {
                    this.snackbar.open(error,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
                });      
   }
   else
   {
     this.snackbar.open('Some fields are mandatory','OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });
   }
 }

}
