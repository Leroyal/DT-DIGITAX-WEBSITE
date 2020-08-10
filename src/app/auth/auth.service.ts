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
  constructor(private http: HttpClient) {
     this.headers = new  HttpHeaders().set("Access-Control-Allow-Origin",  "*"); 
  }
  isLoggedIn = (localStorage.getItem('access_token'))?true:false; 
  
  // store the URL so we can redirect after logging in
 
  redirectUrl: string;

  httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin':'http://localhost:4200'
        })
      };

  login(email: string, password: string, remember:boolean){
    
     return this.http.post<any>(`${environment.BASE_URL}auth/signin`, { email, password })
    
      .pipe(map(fetchresult => {
      console.log(" user",fetchresult)
         
          if (fetchresult && fetchresult.data.session && remember) {
              localStorage.setItem('access_token', fetchresult.data.session.accessToken);
              localStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true
              return fetchresult.result;
          }
          else if(fetchresult && fetchresult.data.session && !remember){
              sessionStorage.setItem('access_token', fetchresult.data.session.accessToken);
              sessionStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true
              return fetchresult.result;
          }
          return fetchresult;
     }));
  }



  loginnew(email: string, password: string, remember:boolean){
    
     sessionStorage.setItem('access_token', '234');
              sessionStorage.setItem('user_id', '123');
              this.isLoggedIn = true;
              let fetch={
              user_id:'123',
              access_token:'234'

              };
              return fetch;

  }

 SignUp(data:any)
    {        

        return this.http.post(`${environment.BASE_URL}auth/signup`, data, {headers: this.headers});
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

         sessionStorage.removeItem('access_token');
         sessionStorage.removeItem('user_id');
 
         //sessionStorage.clear();
         this.isLoggedIn = false;
         })
    );
  }

  getToken() {
        if(sessionStorage.getItem('access_token'))
        {
           return sessionStorage.getItem('access_token');
        }
        else
        return localStorage.getItem('access_token');

var ProductName = sessionStorage.getItem('ProductName');
    }

  getUserId() {
     if(sessionStorage.getItem('user_id'))
        {
           return sessionStorage.getItem('user_id');
        }
        else
        return localStorage.getItem('user_id');
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

    captchaVerify(token: string){
    console.log("callll");
    let secretkey="6LdoiLwZAAAAADmQpBrZnki6eFbWJS-WaD1r1luU";

    let payloadObj={
      secret:secretkey,
      response:token
    }
    
     return this.http.post<any>(`${environment.BASE_URL}`, payloadObj,this.httpOptions)
    
      .pipe(map(fetchresult => {
      console.log(" userrecap",fetchresult);
         
         
          return fetchresult;
     }));
  }
}