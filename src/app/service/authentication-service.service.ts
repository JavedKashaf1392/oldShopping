import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  isUserLoggedIn() {
    throw new Error('Method not implemented.');
  }

  public host=environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper=new JwtHelperService();

  constructor(private http:HttpClient) { }

  // public login(user:User):Observable<HttpResponse<User>>{
  //   return this.http.post<User>
  //   (`${this.host}/user/login`,user,{observe:'response'});
  // }


  LoginUser(user:User):Observable<any>{
    console.log(user);
    const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(`${this.host}/user/login`,user,{headers: headers})
  }


  saveUser(user:User):Observable<any>{
    // console.log("Json data is here"+JSON.stringify(user));
    const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(`${this.host}/user/save`,user,{headers:headers});
  }

  public logOut():void{
    this.token=null;
    this.loggedInUsername = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("users");
  }

  public saveToken(token:string):void{
    this.token=token;
    localStorage.setItem('token',token);
  }

  public addUserToLocalCache(user:User):void{
    localStorage.setItem('user',JSON.stringify(user));
  }

  public getUserFromLocalCache():User{
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken():void{
    this.token=localStorage.getItem('token');
  }

  public getToken():string{
    return this.token;
  }

  // public isLoggedIn():boolean{
  //   this.loadToken();
  //   if(this.token != null && this.token !== ''){
  //     if(!this.jwtHelper.decodeToken(this.token).sub != null || ''){
  //        if(!this.jwtHelper.isTokenExpired(this.token)){
  //          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
  //          return true;
  //        }
  //     }else{
  //       this.logOut();
  //       return false;
  //     }
  //   }
  // }

  private subject=new Subject<any>();

  isLoggedIn(){
    if(localStorage.getItem('currentUser')){
      this.subject.next({status:true});
    }else{
      this.subject.next({status:false});
    }
  }

  clearStatus(){
    this.subject.next();
  }

  getStatus():Observable<any>{
    return this.subject.asObservable();
  }

}
