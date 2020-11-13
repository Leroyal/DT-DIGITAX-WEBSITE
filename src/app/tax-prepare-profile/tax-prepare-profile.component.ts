 /**
 * This component is used for fetch user info after signin.     
 */

 import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
 import { UserService } from '../../app/services/user.service';
 import {first , tap, delay,map } from 'rxjs/operators';
 import {DatePipe} from '@angular/common';
 import * as moment from 'moment';
 import { environment } from '../../environments/environment';
 import {RestrictSeasonService} from '../services/restrict-season.service';

 import { MatSnackBar } from '@angular/material/snack-bar';


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
 restrictSeason:any; 
 taxSeasonRestrict: boolean = false;
 selectImages:any;
 tipsArr = [];
 activeImage: string = 'https://s3.amazonaws.com/digitaxbucket/1603174171040-bigger-better-college-credit-turbotax-thumb-xl.png';
 promotions: any = [];
 tipTitle:any;
 tipLabel:any;
 lastYearTaxExists:boolean = true;
 tipsPanelShow:boolean = false;
 imagePanelShow:boolean = false;


 constructor(private userService:UserService,private restrictseason:RestrictSeasonService,private snackbar: MatSnackBar) { }

 ngOnInit() {
 this.currentYear= moment().year();
 this.title=environment.title;
 this.lastYear= moment().subtract(1, 'years').year();  
 this.listUserDetails();  
 this.seasonGet();
 this.fetchTips();

 }
 /*
 * This function is used for fetch user details.
 * personal info,tax info,last year summary details
 * @param accessToken 
 * @return @array
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

 /**
 * This function is used for switching next page.
 * @param event 
 * @return
 */
 onNext(event) {
 console.log("next");
 event.preventDefault();
 if(this.taxSeasonRestrict){
 this.snackbar.open('Your tax season time expired','OK',{
 verticalPosition: 'top',
 horizontalPosition:'right'
 });
 }
 else{
 location.href = '/tax-prepare-document'; 

 }




 }

 /**
   * This is for fetching season tax information
   * @param accessToken 
   * @return
 */
 seasonGet(){
 this.restrictseason.fetchTaxSeason().subscribe(seasonsGet => {           
 console.log("seasonsGet"+JSON.stringify(seasonsGet)); 

 let endFetchDate=moment(seasonsGet["data"][0].endDate).format('MM/DD/YYYY');

 let curDate=moment().format('MM/DD/YYYY');

 if(endFetchDate < curDate){
 this.taxSeasonRestrict=true;

 }

 })

 }
 /**
 * This function is used for fetching tax tips.
 * @param accessToken 
 * @return
 */
 fetchTips=()=>{
 this.userService.fetchTips().subscribe(tipsGet => { 
 console.log("tipsGet"+JSON.stringify(tipsGet));
 if(tipsGet["status"].status_code==200){
 
 this.promotions = tipsGet["data"];

 if (this.promotions.length > 0) {
 this.tipsPanelShow=true;
 this.setActiveImage(this.promotions);
 }           
 
 

 console.log("tipsarr"+JSON.stringify(this.tipsArr))
 }
 
 })
 }

 /**
 * This function is used for fetching random images after some time interval.
 */

 setActiveImage(promotions) {
 for (let i = 0; i <= promotions.length - 1; i++) {
 console.log("one promotion is: ", promotions[i]);
 setTimeout( ()=> {
 //SET SRC TO FILE FROM PROMOTIONS
 if(promotions[i].image)
   this.imagePanelShow=true;
 this.activeImage = promotions[i].image;
 this.tipTitle= promotions[i].title;
 this.tipLabel= promotions[i].taxTipLabel;
 }, 60000*(i)); //Change i+1 to i if you don't want delay for 1st image.
 }
 }

 /**
* This function is used for download tax files
*/
downloadLastYearTax() {
console.log("ok")
const link = document.createElement('a');
//link.setAttribute('target', '_blank');
link.setAttribute('href', 'https://s3.amazonaws.com/digitaxbucket/1603178195073-all_data.zip');
link.setAttribute('download', `a.zip`);
document.body.appendChild(link);
link.click();
link.remove();
}

 }
