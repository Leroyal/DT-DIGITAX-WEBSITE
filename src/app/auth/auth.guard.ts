import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService }      from './auth.service';
import {first , tap, delay,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(" located in auth.gaurd access_token :",localStorage.getItem('access_token'))
    if (this.authService.isLoggedIn ) { 
       return true; 
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/signin']);
    return false;
  }


  checkToken(url: string): boolean {
    console.log(" located in auth.gaurd access_token :",localStorage.getItem('access_token'))
    if(localStorage.getItem('access_token')) { 
       if(localStorage.getItem('access_token')){
       this.authService.checkToken().pipe(first()).subscribe(request => {
         console.log(request['status'])
         if(request['status'] == 1)
         {
            console.log(url);
            this.authService.redirectUrl = url;
            return true;
            
         }
         else{
           return false;
         }
        });
       }
       else{
         this.router.navigate(['/signin']);
         return false;
       }
    }
    // // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // // Navigate to the login page with extras
    // this.router.navigate(['/login']);
    // return false;
  }

}