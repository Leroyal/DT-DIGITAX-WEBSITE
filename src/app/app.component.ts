import { Component } from '@angular/core';
import { AuthService }      from './auth/auth.service';
import { Router } from "@angular/router";

import { BnNgIdleService } from 'bn-ng-idle'; 

import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA ,MatDialogConfig} from '@angular/material';
import {ConfirmationDialog} from './confirmation-dialog.component';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'digitax';
  opened:boolean=false;
  sidebarShow:boolean=false;
  currentYear: number;
  lastYear: number 
   
   constructor(private authService: AuthService,
   router: Router,
   private bnIdle: BnNgIdleService,
   private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      console.log("logn"+this.authService.isLoggedIn);
     if (this.authService.isLoggedIn  ) { 
       this.sidebarShow = true; 
     }
     router.events.subscribe(val => {
        console.log(val);
         this.opened = false;
      });
     

   }

  ngOnInit(): void {
   /*
 * This function is used for srssion logout after 15 minutes
 * After signup dialog box open 
 */
    
    this.bnIdle.startWatching(900).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        if (this.authService.isLoggedIn ) { 
          this.openDialog();
        }
      }
    });

    this.currentYear= moment().year();
    this.lastYear= moment().subtract(1, 'years').year();
    console.log("lastYear"+this.lastYear);
  }

   openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
      data:{
        title:"aaa",
        message: ' For your protection, your session has ended because it was idle for more than 15 minutes.',
        buttonText: {
          ok: 'OK'
          //cancel: 'No'
        }
      }
    });
    
  }
    /*
 * This function is used for logout
 */


    onLogout(event) {
    console.log("logout");
    event.preventDefault();

   this.authService.logout().subscribe(() => {
     location.href = '/';
   },
   (error: any) => {
      console.log("okj");
      location.href = '/';
   });

   }

}
