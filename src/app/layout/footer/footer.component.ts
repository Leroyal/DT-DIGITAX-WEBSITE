import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  title:string;
  currentYear:number;

  constructor() { }

  ngOnInit() {
   this.currentYear= moment().year();
   this.title=environment.title;
  }

}
