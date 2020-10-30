import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../app/services/survey.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import 'core-js/features/array/includes';
import { CacheService } from '../../app/services/cache.service';
import { Routes, RouterModule,Router } from '@angular/router';
import * as moment from 'moment';

import {Pipe, PipeTransform} from '@angular/core';

import {RestrictSeasonService} from '../services/restrict-season.service';

@Component({
selector: 'app-survey',
templateUrl: './survey.component.html',
styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit  {
categories:any;
myForm: FormGroup; 
restrictSeason:any; 
taxSeasonRestrict: boolean = false;

constructor(private serveyService:SurveyService,private fb: FormBuilder,private cacheService: CacheService,private router: Router,private restrictseason:RestrictSeasonService) { }

ngOnInit() {
this.myForm = this.fb.group({
orders: this.fb.array([])     
});     
this.listCategoryDetails(); 
this.seasonGet();    
}

/*This is for fetching season tax information
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

/*
* This function is used to check for category  already enabled or not 
*/
isExists(value){  

if(localStorage.getItem('survey_step_chkbox')) {   
if (JSON.parse(localStorage.getItem('survey_step_chkbox')).includes(value) ){         
return true;
}
else{      
return false; 
}
}
else{
return false; 
}
}

/*
* This function is used to fetch category details data
* @params(
accessToken:string 

) 
*/
listCategoryDetails(){    
this.serveyService.listSurvey().subscribe(categories => {           
this.categories= categories["data"]; 
})

}

/*
* This function is used while change category 
*/
onChange(categoryid: string, isChecked: boolean) {
console.log("chk"+categoryid+"isChecked"+isChecked);

const selectedOrderIds = this.myForm.value.orders;
let saveData = this.myForm.value;    


if (isChecked) {

saveData.orders.push(categoryid);


} else {      

let index = saveData.orders.findIndex(x => x.value == categoryid);

if(saveData.orders)
saveData.orders.splice(index, 1);

console.log("deselect123"+JSON.stringify(saveData.orders));   

let checkboxStorageValue=JSON.parse(localStorage.getItem('survey_step_chkbox'));

let categoryIndex =checkboxStorageValue.findIndex(x => x.value == categoryid);


checkboxStorageValue.splice(checkboxStorageValue.indexOf(categoryid), 1);

let comString=JSON.stringify(checkboxStorageValue);

localStorage.setItem('survey_step_chkbox',comString );
}
}
/*
* This function is used while click continue button 
*/
onNext(event) {    

let formsvalue=this.myForm.value;
let saveData1 = this.myForm.value;

if(localStorage.getItem('survey_step_chkbox')){

let finalArr1= [ ...JSON.parse(localStorage.getItem('survey_step_chkbox')), ...saveData1.orders];
console.log("arr1"+JSON.stringify(finalArr1));
saveData1.orders=finalArr1;

}
localStorage.setItem('survey_step_chkbox',JSON.stringify(saveData1.orders) );    
this.router.navigate(['/survey-step-two']); 
}

}
