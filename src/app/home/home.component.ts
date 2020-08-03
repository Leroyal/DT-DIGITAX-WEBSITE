import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 submitted:boolean=false;

  constructor(public authService: AuthService,
  	           private fb: FormBuilder, 
  	           private snackbar: MatSnackBar) { }

   loginForm = new FormGroup({
				       email:new FormControl('', [Validators.required,Validators.email]),
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
         sessionStorage.setItem('access_token', '234');
              sessionStorage.setItem('user_id', '123');
              let isLoggedIn = (localStorage.getItem('access_token'))?true:false; 
              //this.isLoggedIn = true;
              let fetch={
              user_id:'123',
              access_token:'234'

              };  
              location.href = '/dashboard'; 
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
