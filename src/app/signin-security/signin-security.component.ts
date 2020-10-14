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
    this.emailStorage=(!localStorage.getItem('user_email')) ? sessionStorage.getItem('user_email') : localStorage.getItem('user_email');
    console.log("this.emailStorage"+this.emailStorage)
  }

  public zipAndDownload(): Observable<any> {
      let url="/home/redapple069/Downloads/all_data.zip";
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
    this.infoService.download('/home/redapple069/Downloads/all_data.zip')
      .subscribe(blob => {
        console.log("pl");
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'archive.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

}
