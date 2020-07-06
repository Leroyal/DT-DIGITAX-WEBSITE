import { Component } from '@angular/core';
import { AuthService }      from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digitax';
  sidebarShow:boolean=false;
   constructor(private authService: AuthService) {
     if (this.authService.isLoggedIn ) { 
       this.sidebarShow = true; 
     }

   }
  
  opened = false;
}
