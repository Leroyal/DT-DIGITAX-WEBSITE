import { Component, NgModule, OnInit,ViewChild } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,
  	           )
               {
  	               this.signupForm = this.fb.group({
                   email: new FormControl('',[Validators.compose([Validators.required,Validators.email,Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]) ]),
                   user_id: new FormControl('',[Validators.required]),
                   phone: new FormControl('', [Validators.compose([
                                                                  Validators.minLength(10),
                                                                  Validators.pattern(/^-?(0|[1-9]\d*)?$/),
                                                                  Validators.required
                                                                ]) ]),
                   password: ['', [Validators.required, Validators.minLength(6)]],
                    });
  	            }
  
  ngOnInit() {
  	
  }

  signupFormSubmit(){
      this.isSubmitted = true;
      console.log(this.signupForm.value);
      if(this.signupForm.valid)
      {
      let saveData = this.signupForm.value;
    
      

        this.authService.SignUp(saveData).pipe(first()).subscribe(res => {
          if(res['status'].status_code == 201)
            {
             this.snackbar.open('Registered successfully','OK',{
		            verticalPosition: 'top',
		            horizontalPosition:'right'
		          });
             location.href = 'signin';
             // this.authService.login(saveData.email, saveData.password).pipe(first()).subscribe(resp => {
             //    if(resp.status == 1){
             //    location.href = '/dashboard';
             //    }
             // });
            }
          else{
             confirm('Something went wrong');
          } 
         });
      }
      else
      {
        this.snackbar.open('Some fields are mandatory','OK',{
            verticalPosition: 'top',
            horizontalPosition:'right'
          });
      }
      
    }

}
