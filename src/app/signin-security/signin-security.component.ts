import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {first , tap, delay,map } from 'rxjs/operators';
import { HttpRequest, HttpHeaders, HttpHandler, HttpEvent, HttpInterceptor,HttpClient ,HttpParams,HttpResponse} from '@angular/common/http';
import { InfoService } from '../services/info.service';



@Component({
  selector: 'app-signin-security',
  templateUrl: './signin-security.component.html',
  styleUrls: ['./signin-security.component.css']
})
export class SigninSecurityComponent implements OnInit {
  emailStorage:string;
  constructor(private http: HttpClient,public infoService: InfoService) { }

  ngOnInit() {
    console.log(
    "sh"+encodeURIComponent('?x=test'));
    //base64 encode
    console.log("btoa"+btoa("test"));
    //base64 decode
    console.log("atob"+atob("dGVzdA=="))
    this.emailStorage=(!localStorage.getItem('user_email')) ? sessionStorage.getItem('user_email') : localStorage.getItem('user_email');
    console.log("this.emailStorage"+this.emailStorage)
  }

   

  public zipAndDownload(): Observable<any> {
      let url="https://s3.amazonaws.com/digitaxbucket/1603178195073-all_data.zip";
      console.log("zip")

       const options:any = {
        headers: new HttpHeaders({'Content-Type': 'zip'}),
        withCredentials: true,
        responseType:'arraybuffer'
      }; 
        return this.http.get<any>(url,options);

      }

       downloadFile(): Observable<any>{
		return this.http.get('/home/redapple069/Downloads/all_data.zip', {responseType: 'blob'});
  }

  download(): void {
    const link = document.createElement('a');
    //link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://s3.amazonaws.com/digitaxbucket/1603178195073-all_data.zip');
    link.setAttribute('download', `a.zip`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
