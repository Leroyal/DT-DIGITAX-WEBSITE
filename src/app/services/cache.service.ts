import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class CacheService {
    access_token;
    headers;
    private formData: any;
    constructor(private http: HttpClient, public authService: AuthService) {
               this.access_token = this.authService.getToken();                           
                this.headers = new  HttpHeaders().set("Authorization", 'Bearer '+this.access_token);
               
    }


    setFormData(formData: any): void {
      this.formData = formData;
  }

    getFormData(): any {
      return this.formData;  
  }

    /*
      * This function is used for fetch user details(personal info)
    */


    listUserDetails() {
      console.log('userlist api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}users-list`,{headers: this.headers});
    }

     getUserListDetails() {
      console.log('userlist api');
      console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/user-tax-history`,{headers: this.headers});
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
      //fetch login details
      getDeviceDetails(){
         return this.http.get(`${environment.BASE_URL}/api/auth/user-account-activity-by-device`,{headers: this.headers});  
      }
      
    


    
  

}
