import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

export const TOKEN='token';
export const AUTHENTICATION_USER='authenticaterUser';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {


  basePath : string='http://localhost:8585/basicauth';

  constructor(private http:HttpClient) { }

  // authenticate(username, password) {
  //   //console.log('before ' + this.isUserLoggedIn());
  //   if(username==="javed" && password === 'javed') {
  //     sessionStorage.setItem('authenticaterUser', username);
  //     //console.log('after ' + this.isUserLoggedIn());
  //     return true;
  //   }
  //   return false;
  // }

  executeAuthenticationService(username, password){

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let headers=new HttpHeaders({
      Authorization:basicAuthHeaderString
    })

    return this.http.get<AuthenticationBean>(this.basePath,{headers}).pipe(
      map(
        data=>{
          sessionStorage.setItem(AUTHENTICATION_USER,username)
          sessionStorage.setItem(TOKEN,basicAuthHeaderString);
        return data;
        }
      )
    );
  }
  
  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATION_USER)
  }
  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem(TOKEN);
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem(AUTHENTICATION_USER)
    return !(user === null)
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATION_USER)
    sessionStorage.removeItem(TOKEN);
  }
}

export class AuthenticationBean{
 constructor(public message:string){}   
}
