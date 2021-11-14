import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  basePath : string='http://localhost:8585/user';

  constructor(private http:HttpClient) { }

  
  
  searchProduct(keyword: string):Observable<User[]> {
    return this.http.get<User[]>(`${this.basePath}/all?keyword=${keyword}`);
  }

  AllUsers(keyword:string,params: any):Observable<any>{
    console.log("All Uses place"+keyword)
    return this.http.get<User[]>(`${this.basePath}/all?keyword=${keyword}`,{params });
  }

  AllUsers1(params: any):Observable<any>{
    return this.http.get<User[]>(`${this.basePath}/all`,{params });
  }



  // getAllProductsdata(keyword:string,params: any):Observable<Product[]>{
  //   console.log("keyword=="+keyword);
  //   return this.http.get<Product[]>(`${this.basePath}/all?keyword=${keyword}`,{params});
  // }

  AllRoles():Observable<any>{
    return this.http.get<User[]>(this.basePath+'/roles');
  }


  
  
  public addUserToLocalCache(users:User){
    localStorage.setItem("users",JSON.stringify(users));
  }

  public getUsersFromLocalCache():User[]{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users'))
    }
    return null;
  }






















  DeleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.basePath}/${id}`,{responseType:'text'});
  }

 

  saveUser(user:User):Observable<any>{
    return this.http.post(`${this.basePath}`,user,{responseType:'text'});
  }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(`${this.basePath}/${id}`);
  }

  
  SaveUser(user:User):Observable<any>{
    return this.http.put(`${this.basePath}`,user,{responseType:'text'});
  }

  


 
  
}
