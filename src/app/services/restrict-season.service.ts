import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';

import * as moment from 'moment';

@Injectable({
providedIn: 'root'
})
export class RestrictSeasonService {
access_token;
headers;
constructor(private http: HttpClient) {

}

/*
* This function is used for tax season
*/
public  log(msg:string){
return msg
}

public fetchTaxSeason() {    


let startDate=moment("2020-10-01T18:30:00.000+00:00").format('MM/DD/YYYY');
return this.http.get(`${environment.BASE_URL}/api/auth/restrict-tax`,{headers: this.headers});
}

}
