import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export interface ICategories {
  title: string;
  id: number; 
  image: string;
  numberOfQuestions:number

}

@Component({
  selector: 'app-survey-step-three',
  templateUrl: './survey-step-three.component.html',
  styleUrls: ['./survey-step-three.component.css']
})
export class SurveyStepThreeComponent implements OnInit {

selectedItem = null;
currentYear:number;
selectValue:number=0;
myImgUrl:string='http://digitaltaxusa.com/assets/images/icon_02.png'; 
selectedItems = null;
groupList:any = [];



public categories: ICategories[] = [
    {
    title: 'Got a raise/bonus',
    id: 1,
    image:"http://digitaltaxusa.com/assets/images/college_expenses_icon.png",
    numberOfQuestions:5

    },
    {
    title: 'New employer',
    id: 2,
    image:"http://digitaltaxusa.com/assets/images/vehicle_registration_fee_icon.png",
    numberOfQuestions:4
    },
    {
    title: 'Retirement plan withdrawal',
    id: 3,
    image:"http://digitaltaxusa.com/assets/images/child_care_expenses_icon.png",
    numberOfQuestions:5
    },
    {
    title: 'New child/dependent',
    id: 4,
    image:"http://digitaltaxusa.com/assets/images/owned_rental_property_icon.png",
    numberOfQuestions:3
    },
    {
    title: 'Sold or traded cryptocurrency',
    id: 5,
    image:"http://digitaltaxusa.com/assets/images/donating_to_charity_icon.png",
    numberOfQuestions:5
    },
    {
    title: 'Received unemployment',
    id: 6,
    image:"http://digitaltaxusa.com/assets/images/bank_account_interest_icon.png",
    numberOfQuestions:5
    }
  ];


  constructor() { }

  ngOnInit() {
   this.currentYear= moment().year();
  }


  onClick(item) {
     console.log("click"+item.id);
     if(item.id)
     //this.selectValue=1;
    // this.selectedItems = item.id;
    if (!this.groupList.some((item1) => item1.id == item.id)) {
     //if (!item.id.includes(this.groupList)) {
        this.groupList.push(item);
        this.selectValue=1;
        this.selectedItems = item.id;
     }
     
      //this.selectedItem = item;
  }

}
