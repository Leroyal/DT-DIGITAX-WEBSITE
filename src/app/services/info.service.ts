import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

import { Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class InfoService {
access_token;
headers;

constructor(private http: HttpClient, public authService: AuthService) {
this.access_token = this.authService.getToken();                           
this.headers = new  HttpHeaders().set("Authorization", 'Bearer '+this.access_token);

}

/**
* This function is used for save user details(personal info)
*/


saveUserDetails(savedata) {
let payloadObj={
firstName:savedata.first_name,
middleInitial:savedata.middle_name,
lastName:savedata.last_name
}
console.log('save userdetails api');
console.log(this.headers);
return this.http.post(`${environment.BASE_URL}/api/auth/update-profile`,payloadObj,{headers: this.headers});
}
/**
* This function is used for fetching user details
*/
getUserListDetails() {
console.log('userlist api');
console.log(this.headers);
return this.http.get(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
}

/**
* This function is used for update user password
* @params savedata:object
*/    
updatePassword(savedata) {
console.log('save userdetails api');
console.log(this.headers);

let payloadObj={
email:(!sessionStorage.getItem('user_email')) ? localStorage.getItem('user_email') : sessionStorage.getItem('user_email'),
oldPassword:savedata.old_password,
password:savedata.new_password


}
return this.http.post(`${environment.BASE_URL}/api/auth/update-password`,payloadObj,{headers: this.headers});
}

/**
* This function is used for send email for verification
* @param email_token:string
*/

sendForVerificationEmail(email_token) {
console.log('save userdetails api'+email_token);
console.log(this.headers);

let payloadObj={
verifyToken:email_token



}
return this.http.post(`${environment.BASE_URL}/api/auth/verify-change-email`,payloadObj,{headers: this.headers});
}
/**
* This function is used for update email 
* @param savedata:object
*/
updateEmail(savedata) {
console.log('save userdetails api');
console.log(this.headers);

let payloadObj={
newEmail:savedata.email,
email:(!localStorage.getItem('user_email'))? sessionStorage.getItem('user_email') :localStorage.getItem('user_email'),
password:savedata.password



}

return this.http.post(`${environment.BASE_URL}/api/auth/change-email`,payloadObj,{headers: this.headers});

}

/**
* This function is used for update email(old version) 
* @param savedata:object
*/

updateEmailV0(savedata) {
console.log('save userdetails api');
console.log(this.headers);

let payloadObj={
newEmail:savedata.email



}

return this.http.post(`${environment.BASE_URL}/api/auth/change-email`,payloadObj,{headers: this.headers});
/*return this.http.post(`${environment.BASE_URL}/api/auth/update-email`,payloadObj,{headers: this.headers});*/
}

/**
* This function is used for send email for  password verification
* @param email_token:string
*/

sendForVerificationPassword(email_token) {
console.log('save userdetails api'+email_token);
console.log(this.headers);

let payloadObj={
newEmail:email_token



}
return this.http.post(`${environment.BASE_URL}/api/auth/verify-change-password`,payloadObj,{headers: this.headers});
}

/**
* This function is used for update password (modified)
* @param savedata:object
*/
updatePasswordV1(savedata) {
console.log('save userdetails api');
console.log(this.headers);

let payloadObj={
/*email:(!sessionStorage.getItem('user_email')) ? localStorage.getItem('user_email') : sessionStorage.getItem('user_email'),*/
oldPassword:savedata.old_password,
password:savedata.new_password,
confirmPassword:savedata.confirm_password


}
return this.http.post(`${environment.BASE_URL}/api/auth/change-password`,payloadObj,{headers: this.headers});
}

/**
* This function is used for send email for  signup confirmation
* @param email_token:string
*/

signupConfirmationEmail(email_token) {
console.log('save userdetails api'+email_token);
console.log(this.headers);

let payloadObj={
newEmail:email_token



}
return this.http.post(`${environment.BASE_URL}/api/auth/verify-change-password`,payloadObj,{headers: this.headers});
}

/**
* This function is used for downloading tax file
* @param url:string
*/

download(url: string): Observable<Blob> {
console.log("kkk")
return this.http.get(`${environment.BASE_URL}`, {
responseType: 'blob'
})
}

/**
* This function is used for fetching user account activity details      
*/
getUserAccountActivity() {
console.log('userlist api');
console.log(this.headers);
return this.http.get(`${environment.BASE_URL}/api/auth/user-account-activity`,{headers: this.headers});
}
/**
* This function is used for fetching tax tips details      
*/

getTaxTips() {
console.log('userlist api');
console.log(this.headers);
return this.http.get(`${environment.BASE_URL}/api/auth/tax-tips`,{headers: this.headers});
}

}
