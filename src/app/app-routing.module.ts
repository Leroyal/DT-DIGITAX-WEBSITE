import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../app/auth/auth.guard';
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
import { SurveyFeedbackComponent } from './survey-feedback/survey-feedback.component';

import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { TermsServiceComponent } from './terms-service/terms-service.component';

import { TermsUseComponent } from './terms-use/terms-use.component';

import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';


const routes: Routes = [
	{ path  : "", 
      component  : LayoutComponent ,
      //canActivate: [AuthGuard],
      
      	children: [
			{ 
				path: '',
				pathMatch: 'full',
				component  : HomeComponent  
		    },
		    { 
				path: 'faq',
				pathMatch: 'full',
				component  : FaqComponent  
		    },
		    /*{ 
				path: '**',
				pathMatch: 'full',
				component  : PageNotFoundComponent  
		    },*/
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
				component  : SurveyComponent,
				canActivate: [AuthGuard]  
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
		    },
		    { 
				path: 'survey-feedback',
				pathMatch: 'full',
				component  : SurveyFeedbackComponent  
		    },

		    { 
		path: 'privacy-policy',
		pathMatch: 'full',
		component  : PrivacyPolicyComponent  
    },
    { 
		path: 'terms-service',
		pathMatch: 'full',
		component  : TermsServiceComponent  
    },
    { 
		path: 'terms-use',
		pathMatch: 'full',
		component  : TermsUseComponent  
    },
    
     { 
		path: 'privacy-statement',
		pathMatch: 'full',
		component  : PrivacyStatementComponent  
    },
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
    }
    

    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
