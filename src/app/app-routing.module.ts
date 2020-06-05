import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaxPrepareProfileComponent } from './tax-prepare-profile/tax-prepare-profile.component';
import { TaxPreparePackageComponent } from './tax-prepare-package/tax-prepare-package.component';
import { TaxPrepareDocumentComponent } from './tax-prepare-document/tax-prepare-document.component';
import { TaxPrepareRegisterComponent } from './tax-prepare-register/tax-prepare-register.component';
import { ResultComponent } from './result/result.component';
import { SubmissionComponent } from './submission/submission.component';
import { FaqComponent } from './faq/faq.component';
import { SurveyComponent } from './survey/survey.component';
import { SurveyStepTwoComponent } from './survey-step-two/survey-step-two.component';
import { SurveyStepThreeComponent } from './survey-step-three/survey-step-three.component';


const routes: Routes = [
	{ path  : ""    , 
      component  : LayoutComponent ,
      canActivate: [],
      
      	children: [
			{ 
				path: 'home',
				pathMatch: 'full',
				component  : HomeComponent  
		    },
		    { 
				path: 'faq',
				pathMatch: 'full',
				component  : FaqComponent  
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
    },

    { 
		path: 'tax-prepare-profile',
		pathMatch: 'full',
		component  : TaxPrepareProfileComponent  
    },

    { 
		path: 'tax-prepare-package',
		pathMatch: 'full',
		component  : TaxPreparePackageComponent  
    },

    { 
		path: 'tax-prepare-document',
		pathMatch: 'full',
		component  : TaxPrepareDocumentComponent  
    },
    { 
		path: 'tax-prepare-register',
		pathMatch: 'full',
		component  : TaxPrepareRegisterComponent  
    },

    { 
		path: 'result',
		pathMatch: 'full',
		component  : ResultComponent  
    },

    { 
		path: 'submission',
		pathMatch: 'full',
		component  : SubmissionComponent  
    },

    { 
		path: 'survey',
		pathMatch: 'full',
		component  : SurveyComponent  
    },
    { 
		path: 'survey-step-two',
		pathMatch: 'full',
		component  : SurveyStepTwoComponent  
    },
    { 
		path: 'survey-step-three',
		pathMatch: 'full',
		component  : SurveyStepThreeComponent  
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
