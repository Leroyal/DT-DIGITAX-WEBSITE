import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class InfoService {
    access_token;
    headers;
  
    constructor(private http: HttpClient, public authService: AuthService) {
               this.access_token = this.authService.getToken();                           
                this.headers = new  HttpHeaders().set("Authorization", 'Bearer '+this.access_token);
               
    }

    /*
      * This function is used for save user details(personal info)
    */
     saveUserDetails(savedata) {
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.put(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
    }

      getUserListDetails() {
       console.log('userlist api');
       console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
    }

    //updatePassword    
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



    updateEmail(savedata) {
      console.log('save userdetails api');
      console.log(this.headers);
       
       let payloadObj={
         newEmail:savedata.email
         


       }
        return this.http.post(`${environment.BASE_URL}/api/auth/update-email`,payloadObj,{headers: this.headers});
    }

}
