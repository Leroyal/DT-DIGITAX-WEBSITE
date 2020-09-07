import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tax-prepare-document',
  templateUrl: './tax-prepare-document.component.html',
  styleUrls: ['./tax-prepare-document.component.css']
})
export class TaxPrepareDocumentComponent implements OnInit {
  currentYear:number;
  title:string;
  @ViewChild('button', {static: true }) button: ElementRef;
  constructor() { }

  ngOnInit() {
  this.currentYear= moment().year();
  this.title=environment.title;
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
