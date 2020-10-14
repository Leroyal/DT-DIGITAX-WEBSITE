import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css']
})
export class VerifyPasswordComponent implements OnInit {
  email_token:any;
  constructor(private snackbar: MatSnackBar,private router: Router,private route: ActivatedRoute,public infoService: InfoService) { }

  ngOnInit() {
      this.email_token= this.route.snapshot.queryParamMap.get("email_token");

      console.log("invitation_code"+this.email_token);

      this.verifyPassword();
  }

  verifyPassword(){
      this.infoService.sendForVerificationPassword(this.email_token).pipe(first()).subscribe(updatepasswordresult => {
                   console.log("api call");
                    if(updatepasswordresult["status"]["status_code"] == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Password verified successfully','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        });                  

                      
                       
                      }
                      else{
                         this.snackbar.open(updatepasswordresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                    
                      
                       
                 });
  }

}
