import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css']
})
export class SiteFooterComponent implements OnInit {
  title:string;
  currentYear:number;

  constructor() { }

  ngOnInit() {
   this.currentYear= moment().year();
   this.title=environment.title;
  }

}
