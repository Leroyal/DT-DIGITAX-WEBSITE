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
  constructor(private fb: FormBuilder, 
  	           private snackbar: MatSnackBar, public userService: UserService,) {

    this.userForm = this.fb.group({
                   first_name: new FormControl('',[Validators.required]),                   
                   last_name: new FormControl('',[Validators.required]),                   
                   user_date:new FormControl('',[Validators.required]),    
                   spouse_first_name: new FormControl(''), 
                   spouse_last_name: new FormControl(''),
                   spouse_date: new FormControl('')
                    });

   }

  ngOnInit() {
  this.currentYear= moment().year();
  this.title=environment.title;
  
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
        console.log("timestamp"+currentDated.getTime());


             if(this.userForm.valid)
      {
          let saveData = this.userForm.value;   
       

        this.userService.saveUserConsent(saveData).pipe(first()).subscribe(res => {
          if(res['status'].status_code == 200)
            {
             this.snackbar.open('Save successfully','OK',{
                verticalPosition: 'top',
                horizontalPosition:'right'
              });              
             
            }
           else{            
             confirm('Sorry, an error occurred. Please email support@digitaltaxusa.com');
             
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


}
