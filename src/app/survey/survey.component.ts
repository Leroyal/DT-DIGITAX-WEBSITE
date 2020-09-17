import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../app/services/survey.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import 'core-js/features/array/includes';
import { CacheService } from '../../app/services/cache.service';
import { Routes, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit  {
  categories:any;
  myForm: FormGroup;   
  
  constructor(private serveyService:SurveyService,private fb: FormBuilder,private cacheService: CacheService,private router: Router) { }

  ngOnInit() {
      this.myForm = this.fb.group({
      	orders: this.fb.array([])     
    });
     
     this.listCategoryDetails();     
  }

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
  listCategoryDetails(){    
   this.serveyService.listSurvey().subscribe(categories => {           
       this.categories= categories["data"]; 
       })

      }

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
      
      //a.splice(index1, 1);
      checkboxStorageValue.splice(checkboxStorageValue.indexOf(categoryid), 1);

      let comString=JSON.stringify(checkboxStorageValue);

      localStorage.setItem('survey_step_chkbox',comString );
    }
  }
   onNext(event) {    
    //event.preventDefault();
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
