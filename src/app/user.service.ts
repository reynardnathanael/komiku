import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var local = "http://localhost/uas_api/";
var host = "https://ubaya.fun/hybrid/160720034/uas_api/";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  checkLogin(user_id:string, user_password:string):Observable<any> {
    let body = new HttpParams();
    body = body.set('user_id', user_id);
    body = body.set('user_password', user_password);
    return this.http.post(host + "login.php", body);
  }

  constructor(private http: HttpClient) { }
}
