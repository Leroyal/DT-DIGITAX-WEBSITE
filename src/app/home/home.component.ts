import { Component, OnInit,ViewChild,NgModule } from '@angular/core';
import { Router }      from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 submitted:boolean=false;
 flag:string;

  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar) { }

   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required]),
				       password: new FormControl('',[Validators.required]),
				       remember_me: new FormControl('')
				    });

    get f() { return this.loginForm.controls; } 	           

  ngOnInit() {
  }


   loginsubmit() {
     console.log("ok");
     this.submitted = true;
      if (this.loginForm.valid) { 
        console.log(this.loginForm.value); 

        if (this.f.email.value.indexOf('@') != -1) {
             console.log("email get");
             this.flag="email";
          }
          else if (this.f.email.value.match(/^[0-9()]+$/)) {
             console.log("phone number get");
             this.flag="phone";
          }
          else{
              console.log("username get");
              this.flag="username";
          }        
        
        this.authService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value,this.flag)
            .pipe(first())
            .subscribe(
                loginresponse => {
                console.log("###");
                console.log(loginresponse);
                if(loginresponse.status.status_code == 200)
                    {
                        this.snackbar.open(loginresponse.status.message,'OK',{
                        verticalPosition: 'top',
                        horizontalPosition:'right',
                        panelClass: ['red-snackbar'],
                        duration:2000
                      });

                      location.href = '/tax-prepare-profile';
                    }
                   else{
                     this.snackbar.open(loginresponse.status.status_message,'OK',{
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
