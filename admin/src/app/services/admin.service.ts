import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL"
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url:any;

    constructor(
      private _http: HttpClient,
    ) {
    this.url = GLOBAL.url;
    }

    getListUser():Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post('https://run.mocky.io/v3/d8488912-f032-43ad-b296-c3eda2b9675d', {headers:headers});
    }
    getListPolicies():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post('http://www.mocky.io/v2/580891a4100000e8242b75c5', {headers:headers});
    }
    generate_token(user: any):Observable<any>{
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this._http.post(this.url+'generate_token', user, {headers:headers});
    }

   getToken(){
     return localStorage.getItem('token');
   }

   public isAuthenticated(allowRoles : string[]):boolean{
    const token:any = localStorage.getItem('token');
      if(!token){
        return false;
      }

      try{
        const helper = new JwtHelperService();
        var decodedToken = helper.decodeToken(token);
        if(!decodedToken){
          localStorage.removeItem('token');
          return false;
        }
      }catch(Exception){
        localStorage.removeItem('token');
        return false;
      }

      return allowRoles.includes(decodedToken['role']);
   }
}
