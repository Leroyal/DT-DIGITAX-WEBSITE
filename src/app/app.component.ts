import { Component } from '@angular/core';
import { AuthService }      from './auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digitax';
  opened:boolean=false;
  sidebarShow:boolean=true;
   
   constructor(private authService: AuthService,router: Router) {
     if (this.authService.isLoggedIn ) { 
       this.sidebarShow = true; 
     }
     router.events.subscribe(val => {
        console.log(val);
         this.opened = false;
      });

   }
}
