import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor,HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   headers;
   access_token;
  constructor(private http: HttpClient) {}
  isLoggedIn = (localStorage.getItem('access_token'))?true:false; 
  
  // store the URL so we can redirect after logging in
 
  redirectUrl: string;

  login(email: string, password: string){
     return this.http.post<any>(`${environment.BASE_URL}admin/login`, { email, password })
      .pipe(map(fetchresult => {
     // console.log(" user",fetchresult)
         
          if (fetchresult && fetchresult.result.access_token) {
              localStorage.setItem('access_token', fetchresult.result.access_token);
              localStorage.setItem('user_id', fetchresult.result.id);
              this.isLoggedIn = true
              return fetchresult.result;
          }
          return fetchresult;
     }));
  }




  sendOTP(email: string){
     return this.http.post<any>(`${environment.BASE_URL}admin/generate-otp`, { communiaction_mode:'email', communication_details:email })
      .pipe(map(fetchresult => {
          return fetchresult;
     }));
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val =>{
         localStorage.removeItem('access_token');
         localStorage.removeItem('user_id');
         this.isLoggedIn = false;
         })
    );
  }

  getToken() {
        return localStorage.getItem('access_token')
    }

  getUserId() {
        return localStorage.getItem('user_id')
    }

  checkToken() {
            this.access_token = localStorage.getItem('access_token');
            this.headers = new  HttpHeaders().set("access_token", this.access_token);  
    return this.http.post(`${environment.BASE_URL}authenticate`,'',{headers: this.headers});
    }


    

    checkOtp(phone_no: string, otp:string, communication_code:string){
      let body = {
          communication_details: phone_no,
          otp: otp,
          communication_code: communication_code
      }
      return this.http.post<any>(`${environment.BASE_URL}check-otp`, body)
        .pipe(map(fetchresult => {
          return fetchresult;
      }));
    }

    getAllPhoneCodes() {
        return this.http.get<any>(`${environment.BASE_URL}phone-codes`).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }
}