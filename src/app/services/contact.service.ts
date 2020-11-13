import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ContactService {
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
      console.log('save userdetails api');
      console.log(this.headers);
        return this.http.post(`${environment.BASE_URL}save-user-details`,{headers: this.headers});
    }    
  

}
