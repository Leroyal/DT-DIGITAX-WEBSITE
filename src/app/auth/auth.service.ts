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

  /*
* This function is used for login
* @param email:string,password:string,remember:boolean,flag:string,myId:string
*/    

  login(email: string, password: string, remember:boolean,flag:string,myId:string){
     let signinObj;
     if(remember){
        signinObj={
         
         username:email,
         password:password,
         deviceType:"Web",
         uniqueId:myId

     }

     }
     else{
         signinObj={
         
         username:email,
         password:password,
         deviceType:"Web"        

        }

     }
    
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/signin`, signinObj/*{ email, password }*/)
    
      .pipe(map(fetchresult => {
      console.log(" user",fetchresult)

           if(fetchresult.status.status_code==200){
         
          if (fetchresult && fetchresult.data.session && remember) {
              console.log("with remember");

              ///save user info in cookie


              localStorage.setItem('user_email', fetchresult.data.user.email);

              localStorage.setItem('user_contact_no', fetchresult.data.user.phone);

              localStorage.setItem('access_token', fetchresult.data.session.accessToken);
              localStorage.setItem('user_id', fetchresult.data.user.id);

              localStorage.setItem('localstore_user_name', fetchresult.data.user.username);

              this.isLoggedIn = true;
              return fetchresult;
          }
          else if(fetchresult && fetchresult.data.session && !remember){
              console.log("with no remember");
              sessionStorage.setItem('user_email', fetchresult.data.user.email);

              sessionStorage.setItem('user_contact_no', fetchresult.data.user.phone);
              
              sessionStorage.setItem('access_token', fetchresult.data.session.accessToken);
              sessionStorage.setItem('user_id', fetchresult.data.user.id);

              localStorage.setItem('localstore_user_name', fetchresult.data.user.username);

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



   /**
   * This function is used for signup
   * @param data:array
*/ 

 SignUp(data:any)
    {  
      let payloadObj;
     if(data.phone){
          payloadObj={
          deviceType:"Web",          
          email:data.email,
          password:data.password,
          phone:data.phone,          
          username:data.username
       }
     }
     else{
        payloadObj={
          deviceType:"Web",
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

  /**
   * This function is used for sending otp
   * @param email:string
*/ 

  sendOTP(email: string){
     return this.http.post<any>(`${environment.BASE_URL}/api/auth/send-otp`, { phone:email})
      .pipe(map(fetchresult => {
          return fetchresult;
     }));
  }

   /**
   * This function is used for logout(default)   
*/  

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
  /**
   * This function is used for site logout(modified)  
*/ 
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
    /**
   * This function is used for fetching token   
*/ 
  getToken() {
        if(sessionStorage.getItem('access_token'))
        {
           return sessionStorage.getItem('access_token');
        }
        else
        return localStorage.getItem('access_token');

var ProductName = sessionStorage.getItem('ProductName');
    }
   /**
   * This function is used for fetching userid
   * @param data:array
*/ 
  getUserId() {
     if(sessionStorage.getItem('user_id'))
        {
           return sessionStorage.getItem('user_id');
        }
        else
        return localStorage.getItem('user_id');
    }
  /**
   * This function is used for checking token  
*/ 
  checkToken() {
            this.access_token = localStorage.getItem('access_token');
            this.headers = new  HttpHeaders().set("access_token", this.access_token);  
    return this.http.post(`${environment.BASE_URL}authenticate`,'',{headers: this.headers});
    }
  /**
   * This function is used for verifying otp
   * @param phone_no:string
*/ 
  verifyOtp(phone_no: string, otp:string,country_code:string){
      let body = {
          phone: phone_no,
          otp: otp,
          deviceType:"Web",
          countryCode:country_code
          
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
  /**
   * This function is used for fetching phone codes   
*/ 
    getAllPhoneCodes() {
        return this.http.get<any>(`${environment.BASE_URL}phone-codes`).pipe(map(fetchresult => {
            return fetchresult;
        }));
    }
  /**
   * This function is used for verify captcha
   * @param token:string
*/ 
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

  /**
   * This function is used for handling error in apis
   
*/ 
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
  /**
   * This function is used for fetching device details
   * @param deviceUniqueId:string
*/ 
    getDeviceDetails(deviceUniqueId: string){
         return this.http.get(`${environment.BASE_URL}/api/auth/user-account-activity-by-device/${deviceUniqueId}`,{headers: this.headers});  
      }

      /**
   * This function is used for deleting device cache details
   * @param deviceUniqueId:string,username:string
*/
      deleteDeviceDetails(deviceUniqueId: string,username:string){
         let userStoreLocal=localStorage.getItem('localstore_user_name');
         return this.http.delete(`${environment.BASE_URL}/api/auth/clear-cache/${deviceUniqueId}/${username}`,{headers: this.headers});  
      }

}