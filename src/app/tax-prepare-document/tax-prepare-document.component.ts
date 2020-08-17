import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-tax-prepare-document',
  templateUrl: './tax-prepare-document.component.html',
  styleUrls: ['./tax-prepare-document.component.css']
})
export class TaxPrepareDocumentComponent implements OnInit {
  currentYear:number;
  @ViewChild('button', {static: true }) button: ElementRef;
  constructor() { }

  ngOnInit() {
  this.currentYear= moment().year();
  }
   public privacyClick() {
    console.log('you clicked');
  }

  onNext(event) {
    console.log("next");
    event.preventDefault();
    
     location.href = '/tax-prepare-register'; 
     

   }

}
