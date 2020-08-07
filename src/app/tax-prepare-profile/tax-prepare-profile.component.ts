 /**
     * This component is used for fetch user info after signin.     
     */

import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

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
  

  constructor(private userService:UserService) { }

  ngOnInit() {
  

 this.currentYear= moment().year();
 this.lastYear= moment().subtract(1, 'years').year();
  //console.log("lastYear"+this.lastYear);
   	this.listUserDetails();
    
  }

  listUserDetails(){
   console.log("ok");
  	/*this.userService.listUserDetails({}).pipe(first()).subscribe(request => {
      if(request['status'])
        {
          this.userList = request['result'];
        }
        
     });
     this.userService.incomeDetails({}).pipe(first()).subscribe(request => {
      if(request['status'])
        {
          this.incomeDetails = request['result'];
        }
        
     });
     this.userService.taxDetails({}).pipe(first()).subscribe(request => {
      if(request['status'])
        {
          this.taxDetails = request['result'];
        }
        
     });
      this.userService.summaryDetails({}).pipe(first()).subscribe(request => {
      if(request['status'])
        {
          this.summaryDetails = request['result'];
        }
        
     });*/
     //
     this.userDetails={
      user_name:'rick roy',
      no_of_dependants:2

     };
     this.incomeDetails ={
       form_name:"Scedule C",
       form_desc:"1099 - G"
     }
     this.taxDetails ={
       tax_desc:"Donations"
      
     }
     this.summaryDetails ={
       filed_on:"Donations",
       filed_type:"AGI",       
       filed_fund:"Federal Refund",
       filed_another:"CA Stoto Rofund"
      
     }
     
  	
  }
  //onNext

    onNext(event) {
    console.log("next");
    event.preventDefault();
    
     location.href = '/tax-prepare-document'; 
     

   }

}
