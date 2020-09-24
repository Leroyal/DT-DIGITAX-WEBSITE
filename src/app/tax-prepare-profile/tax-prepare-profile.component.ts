 /**
     * This component is used for fetch user info after signin.     
     */

import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-tax-prepare-profile',
  templateUrl: './tax-prepare-profile.component.html',
  styleUrls: ['./tax-prepare-profile.component.css']
})
export class TaxPrepareProfileComponent implements OnInit {
  userList:any;
  userDetails:any;
  incomeDetails:any;
  taxDetails:any;
  summaryDetails:any;
  date:any;
  currentYear: number;
  lastYear: number 
  @ViewChild('button', {static: true }) button: ElementRef;
  title:string;
  username:any;
  

  constructor(private userService:UserService) { }

  ngOnInit() {
  

 this.currentYear= moment().year();
 this.title=environment.title;
 this.lastYear= moment().subtract(1, 'years').year();  
   	this.listUserDetails();
    
  }
  /*
   * This function is used for fetch user details.
   * personal info,tax info,last year summary details
  */

  listUserDetails(){ 



  //////////////////
   this.userService.getUserListDetails().subscribe(users => {
      console.log("users"+JSON.stringify(users["data"]["personalInfo"]["fullName"]));
      console.log("length"+ Object.keys(users["data"]["taxBreaks"]).length);  
       
         if(Object.keys(users["data"]["personalInfo"]).length >0){
           console.log("plk");
          this.userDetails={
          user_name:(!users["data"]["personalInfo"]["fullName"]) ? "" :users["data"]["personalInfo"]["fullName"],
          no_of_dependants:(!users["data"]["personalInfo"]["numberOfDependents"]) ? "" : users["data"]["personalInfo"]["numberOfDependents"]

       };
         this.username=users["data"]["personalInfo"]["fullName"];
      }
     else{
       this.userDetails='';

     }
     
     

      if(Object.keys(users["data"]["income"]).length >0){
        this.incomeDetails ={
           form_name:(!users["data"]["income"]["name"]) ? "" : users["data"]["income"]["name"],
           form_desc:(!users["data"]["income"]["description"]) ? "" : users["data"]["income"]["description"]
         }
     }
     else{

        this.incomeDetails='';

     }
     
     if(Object.keys(users["data"]["taxBreaks"]).length >0){
        this.taxDetails ={
           tax_desc:(!users["data"]["taxBreaks"]["taxBreaks"]) ? "" : users["data"]["taxBreaks"]["taxBreaks"]
      
         }
      }
      else{
        this.taxDetails='';

      }
        
      if(Object.keys(users["data"]["previousYearSummary"]).length >0){
        this.summaryDetails ={
           filed_on:(!users["data"]["previousYearSummary"]["FederalRefund"]) ? "" : users["data"]["previousYearSummary"]["FederalRefund"],
           filed_type:(!users["data"]["previousYearSummary"]["FederalRefund"]) ? "" : users["data"]["previousYearSummary"]["FederalRefund"],       
           filed_fund:(!users["data"]["previousYearSummary"]["AdjustedGrossIncome"]) ? "" : users["data"]["previousYearSummary"]["AdjustedGrossIncome"],
           filed_another:(!users["data"]["previousYearSummary"]["StateRefund"]) ? "" : users["data"]["previousYearSummary"]["StateRefund"]
      
          }       

      }
      else{
        this.summaryDetails='';

      }
  
       
       });
  	
  }
  

    onNext(event) {
    console.log("next");
    event.preventDefault();
    
     location.href = '/tax-prepare-document'; 
     

   }

}
