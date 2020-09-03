import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../app/services/user.service';
import {first , tap, delay,map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-tax-prepare-register',
  templateUrl: './tax-prepare-register.component.html',
  styleUrls: ['./tax-prepare-register.component.css']
})
export class TaxPrepareRegisterComponent implements OnInit {
  currentYear:number;
  @ViewChild('button', {static: true }) button: ElementRef;
  userForm: FormGroup;
  isSubmitted:boolean=false;
  title:string;
  consentResult:any;
  userFirstName:"";
  userLastName:"";
  spouseFirstName:"";
  spouseLastName:"";

  constructor(private fb: FormBuilder, 
  	           private snackbar: MatSnackBar, public userService: UserService,) {

    this.userForm = this.fb.group({
                   first_name: new FormControl('',[Validators.required]),                   
                   last_name: new FormControl('',[Validators.required]),                   
                   user_date:new FormControl(''),    
                   spouse_first_name: new FormControl(''), 
                   spouse_last_name: new FormControl(''),
                   spouse_date: new FormControl('')
                    });

   }

  ngOnInit() {
  this.currentYear= moment().year();
  this.title=environment.title;
  this.userConsentDetails();

  
  }

   onNext(event) {
    console.log("next");
    event.preventDefault();    
    this.userFormSubmit();  
     
     

   }
   /* This function is used after user consent form submit
      * @params-user first name, user last name,date,spouse first name,spouse last name,
       * spouse date      

   */

    userFormSubmit(){
      this.isSubmitted = true;
      let saveData = this.userForm.value; 
      console.log("saveData"+JSON.stringify(saveData));  
      console.log('date_of_admission'+moment(new Date(saveData.user_date)).format('YYYY-MM-DD'));      
       let currentDated=new Date();
        


             if(this.userForm.valid)
      {
          let saveData = this.userForm.value;   
       

        this.userService.saveUserConsent(saveData).pipe(first()).subscribe(consentResponse => {
          
          if(consentResponse['status'].status_code == 200)
            {
             
             this.snackbar.open('Save successfully','OK',{
                verticalPosition: 'top',
                horizontalPosition:'right'
              });              
             
            }
           else{     
             this.snackbar.open('Sorry, an error occurred. Please email support@digitaltaxusa.com','OK',{
                verticalPosition: 'top',
                horizontalPosition:'right'
              });       
             
             
          } 
         });
      }
      else
      {
        this.snackbar.open('Some fields are mandatory','OK',{
            verticalPosition: 'top',
            horizontalPosition:'right'
          });
      }
            
      
    }


    

     /* This function is used for fetching user consent related data

   */
   userConsentDetails(){

      this.userService.getUserConsent().subscribe(users => {
      console.log("users"+JSON.stringify(users["data"]["firstName"]));         
      this.userFirstName= users["data"]["firstName"];
      this.userLastName= users["data"]["lastName"];
      this.spouseFirstName= users["data"]["spouseFirstName"];
      this.spouseLastName= users["data"]["spouseLastName"];  
          if(this.userFirstName !=''){           
            this.userForm.controls["first_name"].setErrors(null);
            
           }
           if(this.userLastName !=''){           
            this.userForm.controls["last_name"].setErrors(null);
            
           }

                       

      
      });
   }



}
