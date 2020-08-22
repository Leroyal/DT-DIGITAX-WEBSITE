import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    access_token;
    headers;
  
    constructor(private http: HttpClient, public authService: AuthService) {
               this.access_token = this.authService.getToken();                           
                this.headers = new  HttpHeaders().set("access_token", this.access_token);
               
    }

    /*
      * This function is used for fetch user details(personal info)
    */


    listUserDetails() {
      console.log('userlist api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}users-list`,{headers: this.headers});
    }



     saveUserDetails(savedata) {
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}save-user-details`,{headers: this.headers});
    }

    /*
      * This function is used for saving user details
      * @params(array)
    */


    //SAVE USER CONSENT
     saveUserConsent(savedata) {
      console.log('save userconsent api');      
      /*let payloadObj={
        first_name:savedata.first_name,
        last_name:savedata.last_name,
        user_date:savedata.user_date,
        spouse_first_name:savedata.spouse_first_name,
        spouse_last_name:savedata.spouse_last_name,
        spouse_date:savedata.spouse_date,
        consentToCollectPersonalInformation:true

      };*/
       return this.http.post(`${environment.BASE_URL}save-user-consent`,savedata);
      }
      
    


    
  

}
