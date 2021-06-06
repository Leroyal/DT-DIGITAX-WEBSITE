import { Component, OnInit } from '@angular/core';
import { Router }      from '@angular/router';

import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class InnerLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
