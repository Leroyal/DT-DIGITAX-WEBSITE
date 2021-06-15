import { Component, NgModule, OnInit,ViewChild,ElementRef } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Router }      from '@angular/router';

import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import { AuthService } from '../auth/auth.service';
import {FormControl, FormGroup, FormsModule, FormBuilder, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


import { OnExecuteData, ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import * as moment from 'moment';


import { NgxSpinnerService } from "ngx-spinner";  

import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.css']
})
export class AccountActivityComponent implements OnInit {
  tipsArr:any;

  constructor(private fb: FormBuilder,public infoService: InfoService,private snackbar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.fetchTaxTips();
  }

  fetchTaxTips(){
    this.infoService.getTaxTips().subscribe(getTipsDetails => {

      this.tipsArr=getTipsDetails["data"];

       console.log("account activity"+JSON.stringify(getTipsDetails));

       console.log("title"+getTipsDetails["data"][0].title);

       let tipImage = getTipsDetails["data"][0].image;

       console.log("tipImage"+tipImage);

      

      
    });
  }

}
