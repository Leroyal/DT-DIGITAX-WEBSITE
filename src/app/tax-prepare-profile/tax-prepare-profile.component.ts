 /**
     * This component is used for fetch user info after signin.     
     */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax-prepare-profile',
  templateUrl: './tax-prepare-profile.component.html',
  styleUrls: ['./tax-prepare-profile.component.css']
})
export class TaxPrepareProfileComponent implements OnInit {
  userList:any;

  constructor() { }

  ngOnInit() {
   	this.listUserDetails();
  }

  listUserDetails(){
  console.log("ok");
  	/*this.employeeService.listUserDetails({}).pipe(first()).subscribe(request => {
      if(request['status'])
        {
          this.userList = request['result'];
        }
        
     });*/
  	
  }

}
