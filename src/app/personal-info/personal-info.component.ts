import {Component, NgModule, OnInit, ViewChild, ElementRef} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {Observable, of} from 'rxjs';
import {first, tap, delay, map} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {AuthService} from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


import {OnExecuteData, ReCaptchaV3Service} from 'ng-recaptcha';
import {Subscription} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import * as moment from 'moment';

import {MustMatch} from '../contact-us/match.validator';

import {PasswordValidator} from '../update-email/password.validator';


import {NgxSpinnerService} from "ngx-spinner";

import {InfoService} from '../services/info.service';

import {MarketingService} from '../services/marketing.service';

import {MatSlideToggleChange} from '@angular/material';


@Component({
selector: 'app-personal-info',
templateUrl: './personal-info.component.html',
styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
//email update variable
updateEmailForm: FormGroup;
isSubmitted: boolean = false;
emailStorage: any;
email: any;
confirm_email: any;
password: any;
emailMessage: any;
address1: any;
color: any;
fetchUserFirstName: any;
fetchUserLastName: any;
fetchUserMiddleName: any;
nameVisible: boolean = false;
fullName: any;
fetchDateOfBirth: any;
birthVisible: boolean = false;
fetchOccupation: any;
occupationVisible: boolean = false;
fetchAddress: any;
addressVisible: boolean = false;
birthFormat: any;
showLastYearTax:boolean = true;

/////password update variable
updatePasswordForm: FormGroup;
isPasswordSubmitted: boolean = false;
new_password: any;
confirm_password: any;
old_password: any;

//marketing preference variable
marketingForm: FormGroup;
isMarketingSubmitted: boolean = false;
public varboolean: boolean = true;
public isContactViaMailDisabled: boolean = true;
public isContactViaEmailDisabled: boolean = true;
public isContactViaPhoneDisabled: boolean = true;
public someValue: number;

//data && privacy

firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
isChecked = false;
delshow = true;
showLastTax = false;
loginPhone: any;

//account activity
userArr:any;

constructor(private fb: FormBuilder, public infoService: InfoService, private snackbar: MatSnackBar, private router: Router,
public marketingService: MarketingService
) {
}

ngOnInit() {
this.loginPhone = (!sessionStorage.getItem('user_contact_no') ? localStorage.getItem('user_contact_no') :
sessionStorage.getItem('user_contact_no'));
this.emailMessage = false;
this.emailStorage = (!localStorage.getItem('user_email')) ? sessionStorage.getItem('user_email') : localStorage.getItem('user_email');

this.updateEmailForm = this.fb.group({

email: new FormControl('', [Validators.compose([Validators.required, Validators.email, Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)])]),

confirm_email: new FormControl('', [Validators.required]),

password: ['', [Validators.required, Validators.minLength(6), PasswordValidator.cannotContainSpace]]

}, {
validator: MustMatch('email', 'confirm_email')
});

///update password validation rule
this.updatePasswordForm = this.fb.group({


old_password: new FormControl('', [Validators.required]),

confirm_password: new FormControl('', [Validators.required]),

new_password: ['', [Validators.required, Validators.minLength(6), PasswordValidator.cannotContainSpace]]


}, {
validator: MustMatch('new_password', 'confirm_password')
});


//marketing preference validation rule
this.marketingForm = this.fb.group({
email_option: new FormControl(''),

mail_option: new FormControl(''),

phone_option: new FormControl(''),
});

//data && privacy

this.firstFormGroup = this.fb.group({
firstCtrl: ['', Validators.required],
phone_communication: ['', Validators.required]
});
this.secondFormGroup = this.fb.group({
secondCtrl: ['', Validators.required]
});


this.getMarketingDetails();

this.getNameDetails();
this.fetchAccountActivity();
}

/**This function is used for user account activity
*/
fetchAccountActivity(){
this.infoService.getUserAccountActivity().subscribe(getAccountDetails => {

this.userArr=getAccountDetails["data"];

console.log("account activity"+JSON.stringify(getAccountDetails));

console.log("clientos"+getAccountDetails["data"][0].clientOS);

let firstPart = getAccountDetails["data"][0].clientBrowser.split('-')[0];

console.log("firstPart"+firstPart);

let isLoggedIn=getAccountDetails["data"][0].isLoggedIn;

console.log(isLoggedIn)
});
}


/**
* This function is used for fetch name data
*/
getNameDetails() {
//this will enable after live api url created
this.infoService.getUserListDetails().subscribe(getnamedetails => {

this.fetchUserFirstName = getnamedetails["data"]["userDetails"]["userFirstName"];

this.fetchUserLastName = getnamedetails["data"]["userDetails"]["userLastName"];

this.fetchUserMiddleName=getnamedetails["data"]["userDetails"]["userMiddleInitial"];

this.fullName = this.fetchUserFirstName + " " + this.fetchUserMiddleName + " "+this.fetchUserLastName;


if (this.fetchUserFirstName || this.fetchUserLastName || this.fetchUserMiddleName) {
this.nameVisible = true;
}

//date of birth section
this.fetchDateOfBirth = getnamedetails["data"]["userDetails"]["userDateofbirth"];

console.log("this.fetchDateOfBirth" + this.fetchDateOfBirth)

if (this.fetchDateOfBirth) {
this.birthVisible = true;
this.birthFormat = moment(this.fetchDateOfBirth).format('MM/DD/YYYY');


console.log("this.birthFormat" + this.birthFormat)
}

//userOcupation
this.fetchOccupation = getnamedetails["data"]["userDetails"]["userOcupation"];

if (this.fetchOccupation) {
this.occupationVisible = true;
}

//fetchAddress
this.fetchAddress = getnamedetails["data"]["userAddress"]["addressLine1"];

if (this.fetchAddress) {
this.addressVisible = true;
}


});
}

/**
* This function is used for save email change data
* @params(
email:string,
confirm email:string,
password:string


)
*/
updateEmailFormSubmit() {
this.isSubmitted = true;


if (this.updateEmailForm.valid) {

let saveData = this.updateEmailForm.value;
console.log("saveData" + JSON.stringify(saveData));

this.infoService.updateEmail(saveData).pipe(first()).subscribe(updateemailresult => {
console.log("api call");

if (updateemailresult["status"]["status_code"] == 200) {
this.emailMessage = false;
console.log("ok");
this.snackbar.open('We received your request to change your personal information and have sent you an email to verify these updates. You must verify these changes within 24 hours for them to take place.', 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'

}).onAction()
.subscribe(() => this.router.navigateByUrl('personal-info'));


} else if (updateemailresult['status'].status_code == 400 || updateemailresult['status'].status_code == 401 || updateemailresult['status'].status_code == 500) {
this.snackbar.open(updateemailresult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});
} else {


this.snackbar.open(updateemailresult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});

}
});


;


} else {
this.snackbar.open('Some fields are mandatory', 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});

}

}

/**
* This function is used for fetching update email form values
*/
get f() {
return this.updateEmailForm.controls;
}

/**
* This function is used for save password change data
* @params(
old password:string,
new password:string,
confirm password:string

)
*/
updatePasswordFormSubmit() {
this.isPasswordSubmitted = true;


if (this.updatePasswordForm.valid) {

let saveData = this.updatePasswordForm.value;
console.log("saveData" + JSON.stringify(saveData));

this.infoService.updatePasswordV1(saveData).pipe(first()).subscribe(updatepasswordresult => {
console.log("api call");

if (updatepasswordresult["status"]["status_code"] == 200) {
console.log("ok");
this.snackbar.open('Password updated successfully.', 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'

}).onAction()
.subscribe(() => this.router.navigateByUrl('personal-info'));


} else if (updatepasswordresult['status'].status_code == 400 || updatepasswordresult['status'].status_code == 401 || updatepasswordresult['status'].status_code == 500) {
this.snackbar.open(updatepasswordresult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});
} else {


this.snackbar.open(updatepasswordresult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});

}
});


;


} else {
this.snackbar.open('Some fields are mandatory', 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});

}

}
/**
* This function is used for fetching data for password update form values
*/
get g() {
return this.updatePasswordForm.controls;
}
/**
* This function is used for fetching data for marketing form values
*/
get m() {
return this.marketingForm.controls;
}

/**
* This function is used to fetch user marketing preferences data
* @param accessToken of login user
* @return object
*/
getMarketingDetails() {
this.marketingService.getMarketingDetails().subscribe(marketingdetails => {
console.log("ok" + JSON.stringify(marketingdetails));

if (marketingdetails["status"]["status_code"] == 200) {

this.isContactViaMailDisabled = (marketingdetails["data"]["isContactViaMailDisabled"] == 'false') ? false : true;


this.isContactViaEmailDisabled = (marketingdetails["data"]["isContactViaEmailDisabled"] == 'false') ? false : true;
this.isContactViaPhoneDisabled = (marketingdetails["data"]["isContactViaPhoneDisabled"] == 'false') ? false : true;
}

});
}

/**
* This function is used to save user marketing preferences data.
* @param phone_option
* @param mail_option
* @param email_option
* @return
*/
marketingFormSubmit() {

this.isMarketingSubmitted = true;

console.log("ok")
if (this.marketingForm.valid) {

let saveData = this.marketingForm.value;
console.log("saveData" + JSON.stringify(saveData));
if (saveData.phone_option == null) {

saveData.phone_option = this.isContactViaPhoneDisabled;


}

if (saveData.mail_option == null) {

saveData.mail_option = this.isContactViaMailDisabled;

}

if (saveData.email_option == null) {

saveData.email_option = this.isContactViaEmailDisabled;

}


this.marketingService.saveMarketingDetails(saveData).pipe(first()).subscribe(marketingSaveResult => {

if (marketingSaveResult["status"]["status_code"] == 200) {
console.log("ok");
this.snackbar.open('Saved successful!', 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'

}).onAction()
.subscribe(() => this.router.navigateByUrl('personal-info'));


} else if (marketingSaveResult['status'].status_code == 400 || marketingSaveResult['status'].status_code == 401) {
this.snackbar.open(marketingSaveResult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});
} else {


this.snackbar.open(marketingSaveResult['status']['message'], 'OK', {
verticalPosition: 'top',
horizontalPosition: 'right'
});

}
});
}

}

/*Phone communication enable
**By turning ON, Users receive promotional calls to this phone number from Digitax agents. If user do not turn this on, user may still get important communications specific to their account, transactions, or inquiries.
* @param accessToken 
* @return
*/
onChange(value: MatSlideToggleChange) {
const {checked} = value;

console.log("checked" + checked)
}

/**
* This function is hit after clicking delete button 
* @param event
* @return
*/
onClickDelete() {
console.log("event")
if (this.delshow == true) {
this.delshow = false
} else {
this.delshow = true;
}


}
/**
* This function is hit after clicking download last year tax return
*/
clickLastTaxDownload() {
this.showLastTax = false;
this.showLastYearTax = true;
console.log("this.showLastTax"+this.showLastTax)
}
/**
* This function is used for download tax files
*/
downloadDataAll() {
console.log("ok")
const link = document.createElement('a');
link.setAttribute('target', '_blank');
link.setAttribute('href', 'https://s3.amazonaws.com/digitaxbucket/1603178195073-all_data.zip');
link.setAttribute('download', `a.zip`);
document.body.appendChild(link);
link.click();
link.remove();
}
/**
* This function is used for clickind download button
*/
clickallTaxDownload() {
this.showLastTax = true;
this.showLastYearTax = false;

console.log("this.showLastTax"+this.showLastTax)
}
}
