import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MarketingService {
    access_token;
    headers;
  
    constructor(private http: HttpClient, public authService: AuthService) {
               this.access_token = this.authService.getToken();                           
                this.headers = new  HttpHeaders().set("Authorization", 'Bearer '+this.access_token);
               
    }

    /*
      * This function is used for fetch user details(personal info)
    */


    listSurvey() {
      console.log('userlist api');
      console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/question-categories`,{headers: this.headers});
    }

     getMarketingDetails() {
        console.log('userlist api');      
        return this.http.get(`${environment.BASE_URL}/api/auth/user-marketing-preference`,{headers: this.headers});
    }



     saveMarketingDetails(savedata) {
      console.log('save userdetails api');
        let payloadObj={
           isContactViaEmailDisabled:savedata.email_option,
           isContactViaMailDisabled:savedata.mail_option,
           isContactViaPhoneDisabled:savedata.phone_option
        }
        return this.http.post(`${environment.BASE_URL}/api/auth/user-marketing-preference`,payloadObj,{headers: this.headers});
    }

    /*
      * This function is used for saving user details
      * @params(array)
    */


    //SAVE USER CONSENT
     saveUserConsent(savedata) {
      console.log('save userconsent api');      
      let payloadObj={
        firstName:savedata.first_name,
        lastName:savedata.last_name,        
        spouseFirstName:savedata.spouse_first_name,
        spouseLastName:savedata.spouse_last_name,
        consentToShareInformation:true
        

      };
       return this.http.post(`${environment.BASE_URL}/api/auth/user-consents`,payloadObj,{headers: this.headers});
      }

      getUserConsent(){
        return this.http.get(`${environment.BASE_URL}/api/auth/user-consents`,{headers: this.headers});
      }
      
    


    
  

}
