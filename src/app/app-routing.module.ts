import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
	{ path  : ""    , 
      component  : LayoutComponent ,
      canActivate: [],
      
      	children: [
			{ 
				path: 'home',
				pathMatch: 'full',
				component  : HomeComponent  
		    }
	    ]
    },

    { 
		path: 'signin',
		pathMatch: 'full',
		component  : SigninComponent  
    },

    { 
		path: 'signup',
		pathMatch: 'full',
		component  : SignupComponent  
    },

    { 
		path: 'reset-password',
		pathMatch: 'full',
		component  : ResetPasswordComponent  
    },

    { 
		path: 'dashboard',
		pathMatch: 'full',
		component  : DashboardComponent  
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
