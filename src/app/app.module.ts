import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

import {MatGridListModule} from '@angular/material/grid-list';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MenuListComponent } from './menu-list/menu-list.component';
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
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

import { SurveyFeedbackComponent } from './survey-feedback/survey-feedback.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BnNgIdleService } from 'bn-ng-idle'; 

import {ConfirmationDialog} from './confirmation-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

//import { RecaptchaFormsModule, RecaptchaModule, } from 'ng-recaptcha';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings,RecaptchaFormsModule,RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module  } from 'ng-recaptcha';
//import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import {    
  MatDialogModule   
  
} from '@angular/material';

import {NgxPrintModule} from 'ngx-print';

import {MatDividerModule} from '@angular/material/divider';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TermsServiceComponent } from './terms-service/terms-service.component';
import { TermsUseComponent } from './terms-use/terms-use.component';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

import { NgxSpinnerModule,NgxSpinnerService } from "ngx-spinner";
import { ContactUsComponent } from './contact-us/contact-us.component';

import { MatSelectModule } from '@angular/material/select';
import { MyInfoComponent } from './my-info/my-info.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UpdateBirthdayComponent } from './update-birthday/update-birthday.component';
import { UpdateOccupationComponent } from './update-occupation/update-occupation.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

import { MobileVerificationComponent } from './mobile-verification/mobile-verification.component';

import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

import {MatRadioModule} from '@angular/material/radio';

import { MarketingPreferencesComponent } from './marketing-preferences/marketing-preferences.component';
import { SigninSecurityComponent } from './signin-security/signin-security.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {MatMenuModule} from '@angular/material/menu';

import { PersonalInfoComponent } from './personal-info/personal-info.component';


/*import { WebLayoutComponent } from './web-layout/site-layout.component';*/

import { SiteHeaderComponent } from './inner-layout/site-header/site-header.component';
import { SiteFooterComponent } from './inner-layout/site-footer/site-footer.component';

import { InnerLayoutComponent } from './inner-layout/site-layout.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyPasswordComponent } from './verify-password/verify-password.component';
import { SignupConfirmationComponent } from './signup-confirmation/signup-confirmation.component';
import { NotfoundComponent } from './notfound/notfound.component';

import {MatStepperModule} from '@angular/material/stepper';
import { AccountActivityComponent } from './account-activity/account-activity.component';


@NgModule({
  exports: [   
    MatDialogModule   
    
  ]
  
  
  
  
  
})
export class MaterialModule {}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    MenuListComponent,
    DashboardComponent,
    TaxPrepareProfileComponent,
    TaxPreparePackageComponent,
    TaxPrepareDocumentComponent,
    TaxPrepareRegisterComponent,
    ResultComponent,
    SubmissionComponent,
    FaqComponent,
    SurveyComponent,
    SurveyStepTwoComponent,
    SurveyStepThreeComponent,
    SurveyFeedbackComponent,
    ConfirmationDialog,
    AlertDialogComponent,
    PrivacyPolicyComponent,
    TermsServiceComponent,
    TermsUseComponent,
    PrivacyStatementComponent,
    ContactUsComponent,
    MyInfoComponent,
    UpdateNameComponent,
    UpdateAddressComponent,
    UpdateBirthdayComponent,
    UpdateOccupationComponent,
    UpdateEmailComponent,
    UpdatePasswordComponent,
    MobileVerificationComponent,
    OtpVerificationComponent,
    MarketingPreferencesComponent,
    SigninSecurityComponent,
    PersonalInfoComponent,
    //WebLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    InnerLayoutComponent,
    VerifyEmailComponent,
    VerifyPasswordComponent,
    SignupConfirmationComponent,
    NotfoundComponent,
    AccountActivityComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatExpansionModule,
    TextFieldModule,
    MatSnackBarModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatDialogModule,
    NgxPrintModule,
    RecaptchaV3Module,
    MatDividerModule,
    SlickCarouselModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatStepperModule
    

    
    

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  //providers: [BnNgIdleService],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: {
      siteKey: '6LePbq4UAAAAAPqwJU8u5g1Of1TIEMyoPpJQpyaD',
    } as RecaptchaSettings,
  },

  BnNgIdleService,NgxSpinnerService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialog, AlertDialogComponent]
})
//6LeJqqsZAAAAAKaXJ0q65NRkbaos4hbYjCpiY5t5
//work 6LePbq4UAAAAAPqwJU8u5g1Of1TIEMyoPpJQpyaD
export class AppModule { }
