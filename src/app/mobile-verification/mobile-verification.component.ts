import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

@Component({
selector: 'app-mobile-verification',
templateUrl: './mobile-verification.component.html',
styleUrls: ['./mobile-verification.component.css']
})
export class MobileVerificationComponent implements OnInit {
state:any;
mobileVerificationForm: FormGroup;  
isSubmitted:boolean=false;
phoneNumberStorage: any;
emailStorage:any;
firstWordEmail:any;
lastWordEmail:any;



constructor(public authService: AuthService,
private fb: FormBuilder,
private snackbar: MatSnackBar,
private router: Router) {
this.mobileVerificationForm = this.fb.group({
verify_mobile: new FormControl('',[Validators.required])                   

});
}

ngOnInit() {


//user_phone
this.state = window.history.state.password; 
console.log("this.hero"+this.state);
this.phoneNumberStorage=
localStorage.getItem('user_phone').substr(localStorage.getItem('user_phone').length - 4);

//this.firstWordEmail=localStorage.getItem('email').charAt(0);

// this.lastWordEmail=localStorage.getItem('email').replace(/@.*/,"");

//this.lastWordEmail=this.lastWordEmail.substr(//this.lastWordEmail.length - 1);
//this.emailStorage=localStorage.getItem('user_email');
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

this.router.navigate(['otp-verify'], { 
state: { password: this.state } 
}); 

//this will enable after live api url created. 
console.log("environment.phone_code"+environment.phone_code)            
this.authService.sendOTP(environment.phone_code+localStorage.getItem('user_phone'))
.pipe(first())
.subscribe(
verifyresponse => {

if(verifyresponse.status.status_code == 200)
{
this.snackbar.open(verifyresponse.status.message,'OK',{
verticalPosition: 'top',
horizontalPosition:'right',
panelClass: ['red-snackbar'],
duration:2000
});

this.router.navigate(['otp-verify'], { 
state: { password: this.state } 
});

}
else{
this.snackbar.open(verifyresponse.status.message,'OK',{
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

}

}
