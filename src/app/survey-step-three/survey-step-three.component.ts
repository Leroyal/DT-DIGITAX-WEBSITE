import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export interface ICategories {
  name: string;
  id: number;  
}

@Component({
  selector: 'app-survey-step-three',
  templateUrl: './survey-step-three.component.html',
  styleUrls: ['./survey-step-three.component.css']
})
export class SurveyStepThreeComponent implements OnInit {

selectedItem = null;
currentYear:number;


public categories: ICategories[] = [
    {
    name: 'Got a raise/bonus',
    id: 1
    },
    {
    name: 'New employer',
    id: 2
    },
    {
    name: 'Retirement plan withdrawal',
    id: 3
    },
    {
    name: 'New child/dependent',
    id: 4
    },
    {
    name: 'Sold or traded cryptocurrency',
    id: 5
    },
    {
    name: 'Received unemployment',
    id: 6
    }
  ];


  constructor() { }

  ngOnInit() {
   this.currentYear= moment().year();
  }


  onClick(item) {
     console.log("click"+item.id);
    this.selectedItem = item;
  }

}
