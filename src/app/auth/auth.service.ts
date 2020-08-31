import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor,HttpClient ,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, of } from 'rxjs';
import { tap, delay,map } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
   headers;
   headers1;
   access_token;
  constructor(private http: HttpClient) {
     this.headers = new  HttpHeaders().set("Access-Control-Allow-Origin",  "*"); 
  }
  isLoggedIn = (localStorage.getItem('access_token') || sessionStorage.getItem('access_token'))?true:false; 
  
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

      httpOptions1 = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type':  'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'http://localhost:4200'
        })
      };

  login(email: string, password: string, remember:boolean,flag:string){

     let signinObj={

         [flag]:email,
         password:password,
         deviceType:"web"

     }
    
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/signin`, signinObj/*{ email, password }*/)
    
      .pipe(map(fetchresult => {
      console.log(" user",fetchresult)
         
          if (fetchresult && fetchresult.data.session && remember) {
              console.log("with remember");
              localStorage.setItem('access_token', fetchresult.data.session.accessToken);
              localStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true;
              return fetchresult;
          }
          else if(fetchresult && fetchresult.data.session && !remember){
              console.log("with no remember");
              sessionStorage.setItem('access_token', fetchresult.data.session.accessToken);
              sessionStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true;
              return fetchresult;
          }
          this.isLoggedIn = true;
          return fetchresult;
     }));
  }



  

 SignUp(data:any)
    {  


     return this.http.post<any>(`${environment.BASE_URL}/api/auth/signup`, data,{headers: this.headers})
    
      .pipe(map(fetchresult => {
           console.log(" user",fetchresult.status.status_code)
         if(fetchresult && fetchresult.status.status_code==200){
         
          if (fetchresult && fetchresult.data.session) {
              localStorage.setItem('access_token', fetchresult.data.session.accessToken);
              localStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true
              return fetchresult;
          }
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
    console.log("logout func call");
    return of(true).pipe(
      delay(1000),
      tap(val =>{

         localStorage.removeItem('access_token');
         localStorage.removeItem('user_id');

         sessionStorage.removeItem('access_token');
         sessionStorage.removeItem('user_id');
 
         //sessionStorage.clear();
          localStorage.clear();
         this.isLoggedIn = false;
         })
    );
  }

  siteLogout()
    {      
      let payloadObj={
        accessToken:localStorage.getItem('access_token')
      };

        
        return this.http.post(`${environment.BASE_URL}/api/auth/signout`, payloadObj, {headers: this.headers}).pipe(map(fetchresult => {
         console.log(" user",fetchresult)
         
          if (fetchresult) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user_id');

             sessionStorage.removeItem('access_token');
             sessionStorage.removeItem('user_id');
     
             //sessionStorage.clear();
             this.isLoggedIn = false;
          }         
          return fetchresult;
     }));
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


 

       let httpOptions1 = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Content-Type':  'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin':'http://localhost:4200'
        })
      };

      this.headers1 = new HttpHeaders(
        {
            'Content-Type':  'application/x-www-form-urlencoded',
            Accept: '*/*',

            
        }
    );




let data={
    secret:environment.secret_key,  
    response:token
}

      const body = new HttpParams({fromObject: data});
    const options = { headers: this.headers1}; 

    

      return this.http.post(`${environment.CAPTCHA_URL}`, body.toString(), options);

  }
}