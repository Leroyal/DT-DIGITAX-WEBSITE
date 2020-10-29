import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor,HttpClient ,HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';

import { SigninComponent } from '../signin/signin.component';

import { Observable, of,throwError } from 'rxjs';
import { tap, delay,map  } from 'rxjs/operators';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
   headers;
   headers1;
   access_token;
   public hero: SigninComponent;
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
         
         username:email,
         password:password,
         deviceType:"Web"
         //deviceType:"web"

     }
    
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/signin`, signinObj/*{ email, password }*/)
    
      .pipe(map(fetchresult => {
      console.log(" user",fetchresult)

           if(fetchresult.status.status_code==200){
         
          if (fetchresult && fetchresult.data.session && remember) {
              console.log("with remember");

              localStorage.setItem('user_email', fetchresult.data.user.email);

              localStorage.setItem('user_contact_no', fetchresult.data.user.phone);

              localStorage.setItem('access_token', fetchresult.data.session.accessToken);
              localStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true;
              return fetchresult;
          }
          else if(fetchresult && fetchresult.data.session && !remember){
              console.log("with no remember");
              sessionStorage.setItem('user_email', fetchresult.data.user.email);

              sessionStorage.setItem('user_contact_no', fetchresult.data.user.phone);
              
              sessionStorage.setItem('access_token', fetchresult.data.session.accessToken);
              sessionStorage.setItem('user_id', fetchresult.data.user.id);
              this.isLoggedIn = true;
              return fetchresult;
          }
          }
          else{
          
          this.isLoggedIn = true;
          return fetchresult;

          }
     }));
  }



  

 SignUp(data:any)
    {  
      let payloadObj;
     if(data.phone){
          payloadObj={
          deviceType:"Web",
          //deviceType:"web",
          email:data.email,
          password:data.password,
          phone:data.phone,
          //role:data.role,
          username:data.username
       }
     }
     else{
        payloadObj={
          deviceType:"web",
          email:data.email,
          password:data.password,          
          username:data.username
       }

     }
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/signup`, payloadObj,{headers: this.headers})
    
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
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/send-otp`, { phone:email})
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
         localStorage.removeItem('survey_step_chkbox');

         sessionStorage.removeItem('access_token');
         sessionStorage.removeItem('user_id'); 
         
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
             sessionStorage.removeItem('user_email');
             sessionStorage.removeItem('user_id');
              localStorage.clear();
              sessionStorage.clear();
             
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

  verifyOtp(phone_no: string, otp:string){
      let body = {
          phone: phone_no,
          otp: otp,
          deviceType:"web",
          countryCode:"IN"
          
      }
      return this.http.post<any>(`${environment.BASE_URL}/api/auth/mobile-number-signin`, body)
        .pipe(map(fetchresult => {
          return fetchresult;
      }));
    }
    

    verifyOtpOld(phone_no: string, otp:string){
      let body = {
          phone: phone_no,
          otp: otp
          
      }
      return this.http.post<any>(`${environment.BASE_URL}/api/auth/verify-otp`, body)
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

    
      
      /*return this.http.post(`${environment.CAPTCHA_URL}`, body.toString(), options);*/

       return this.http.post(`${environment.CAPTCHA_URL}`, body.toString(), options).pipe(
               // retry(1),
                catchError(this.handleError)
            );

       

  }


    handleError(error) {
        console.log("handle");
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

    getDeviceDetails(){
         return this.http.get(`${environment.BASE_URL}/api/auth/user-account-activity-by-device`,{headers: this.headers});  
      }
}