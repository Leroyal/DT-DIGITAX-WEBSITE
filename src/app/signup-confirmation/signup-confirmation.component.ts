import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.css']
})
export class SignupConfirmationComponent implements OnInit {
 email_token:any;

  constructor(private snackbar: MatSnackBar,private router: Router,private route: ActivatedRoute,public infoService: InfoService) { }

  ngOnInit() {
    this.email_token= this.route.snapshot.queryParamMap.get("email_token");

      console.log("invitation_code"+this.email_token);

      //this.verifyEmail();
  }

  verifyEmail(){
      this.infoService.signupConfirmationEmail(this.email_token).pipe(first()).subscribe(updateemailresult => {
                   console.log("api call");
                    if(updateemailresult["status"]["status_code"] == 200)
                      {
                       console.log("ok"); 
                       this.snackbar.open('Thank you for signup in Digitax','OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                          
                        });                  

                      
                       
                      }
                      else{
                         this.snackbar.open(updateemailresult['status']['message'],'OK',{
                          verticalPosition: 'top',
                          horizontalPosition:'right'
                        });
                      }
                    
                      
                       
                 });
  }

}
