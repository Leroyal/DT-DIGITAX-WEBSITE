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
     
     /*this.userDetails={
      user_name:'rick roy',
      no_of_dependants:2

     };*/
     this.userDetails='';
     /*this.incomeDetails ={
       form_name:"Scedule C",
       form_desc:"1099 - G"
     }*/
     this.incomeDetails='';
     this.taxDetails ={
       tax_desc:"Donations"
      
     }
     this.taxDetails='';
     /*this.summaryDetails ={
       filed_on:"Donations",
       filed_type:"AGI",       
       filed_fund:"Federal Refund",
       filed_another:"CA Stoto Rofund"
      
     }*/
     this.summaryDetails='';
     
  	
  }
  

    onNext(event) {
    console.log("next");
    event.preventDefault();
    
     location.href = '/tax-prepare-document'; 
     

   }

}
