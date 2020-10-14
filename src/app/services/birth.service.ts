import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BirthService {
    access_token;
    headers;
  
    constructor(private http: HttpClient, public authService: AuthService) {
               this.access_token = this.authService.getToken();                           
                this.headers = new  HttpHeaders().set("Authorization", 'Bearer '+this.access_token);
               
    }

    /*
      * This function is used for save user details(personal info)
    */
     saveBirthDetails(savedata) {
      //dateofbirth
      let payloadObj={
        dateofbirth: savedata.birth_date
      }
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}/api/auth/update-profile`,payloadObj,{headers: this.headers});
    }

      getBirthListDetails() {
       console.log('userlist api');
       console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
    }  


      

      getAddressListDetails() {
       console.log('userlist api');
       console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
    }

    saveAddressDetails(savedata) {
      let payloadObj={
        addressLine1:savedata.address1,
        addressLine2:savedata.address2,
        city:savedata.city,
        country:savedata.country,        
        postalCode:savedata.zip,
        state:savedata.state
        
      }
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}/api/auth/update-profile`,payloadObj,{headers: this.headers});
    } 

    //getOccupationListDetails

    getOccupationListDetails() {
       console.log('userlist api');
       console.log(this.headers);
        return this.http.get(`${environment.BASE_URL}/api/auth/user-details`,{headers: this.headers});
    }


    saveOccupationDetails(savedata) {
      let payloadObj={
        ocupation:savedata.occupation
      }
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}/api/auth/update-profile`,payloadObj,{headers: this.headers});
    }


  

}
