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
selector: 'app-otp-verification',
templateUrl: './otp-verification.component.html',
styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
cache_flag:any;
state:any;
localsendOtp:any;
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
this.cache_flag=window.history.state.flag; 
console.log("this.cache_flag"+this.cache_flag)
this.state = window.history.state.password; 
console.log("this.hero"+this.state);
this.localsendOtp=localStorage.getItem('sent_otp');
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
/*if(this.cache_flag){
	location.href = '/tax-prepare-profile';
}*/
let saveData = this.otpVerificationForm.value; 
console.log("saveData"+JSON.stringify(saveData));



//call verify otp api and match
this.authService.verifyOtp(environment.phone_code+localStorage.getItem('user_phone'), saveData.verify_code)
.pipe(first())
.subscribe(
verifyresponse => {


console.log("this.verifyresponse"+JSON.stringify(verifyresponse));

if(verifyresponse.status.status_code == 200)
{
location.href = '/tax-prepare-profile';

//call signin api

/*this.authService.login(localStorage.getItem('user_phone'), this.state, true,'phone')
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
});*/ 

}
else{
//verify code not match
this.snackbar.open('Verification code does not match','OK',{
verticalPosition: 'top',
horizontalPosition:'right',
panelClass: ['red-snackbar'],
duration:2000
});
}





////verify otp call

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
