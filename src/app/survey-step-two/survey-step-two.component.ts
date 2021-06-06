import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

@Component({
  selector: 'app-survey-step-two',
  templateUrl: './survey-step-two.component.html',
  styleUrls: ['./survey-step-two.component.css']
})
export class SurveyStepTwoComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

   onNext(event) {
    console.log("next");
    event.preventDefault();
    this._location.back();

    // location.href = '/tax-prepare-document'; 
     

   }

}
