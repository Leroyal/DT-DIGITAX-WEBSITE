import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private fb: FormBuilder, 
  	           private snackbar: MatSnackBar,) {

    this.userForm = this.fb.group({
                   first_name: new FormControl('',[Validators.required]),                   
                   last_name: new FormControl('',[Validators.required]),                   
                   user_date:new FormControl('',[Validators.required]),    
                   spouse_first_name: new FormControl(''), 
                   spouse_last_name: new FormControl('')
                    });

   }

  ngOnInit() {
  this.currentYear= moment().year();
  }

   onNext(event) {
    console.log("next");
    event.preventDefault();
    
    this.userFormSubmit();
    
     //location.href = '/tax-prepare-register'; 
     

   }

    userFormSubmit(){
      this.isSubmitted = true;
      
     console.log("pok");
      
    }


}
