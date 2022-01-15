import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
  addressVisible=false;
  address1:string;
  address2:string;
  
  constructor(public infoService: InfoService) { }

  ngOnInit() {
    this.getTabDetails();
  }
  /*
 * This function is used to fetch user profile data
 */
  getTabDetails(){ 
   console.log("get details");
  
  this.infoService.getUserListDetails().subscribe(users => {
        console.log("okl"+users["status"]["status_code"]);
          if(users["status"]["status_code"]==200){
          
           if(!users["data"]["userAddress"]){
              this.addressVisible=false;
           }
           
          else {
             this.addressVisible=true;
             this.address1=users["data"]["userAddress"]["addressLine1"]+", "+users["data"]["userAddress"]["addressLine2"];
          }

       } 
       


   });

   }

}
