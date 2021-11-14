import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../class/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  basePath : string='http://localhost:8585/category';
  constructor(private http:HttpClient) { }



  // getAllCategories():Observable<Category[]>{

  //   return this.http.get<Category[]>(`${this.basePath}/categories`);
  // }

  getAllCategoriesForms():Observable<any>{
    return this.http.get<any>(`${this.basePath}/categoriesForm`)
  }

 

  // getAllUsers(token:any):Observable<any>{
  //   console.log("this is the token is here::::"+token);
  //   const headers=new HttpHeaders({'Authorization':token});
  //   return this.http.get(`${this.url}/users`,{headers: headers})
  // }


  getAllCategory(params: any):Observable<Category[]>{
    return this.http.get<Category[]>(this.basePath +'/categories',{params});

    // return this.http.get<User[]>(`${this.basePath}/alll?keyword=${keyword}`);
  }


  getAllCategorysdata(keyword:string,params: any):Observable<Category[]>{
    console.log("keyword=="+keyword);
    return this.http.get<Category[]>(`${this.basePath}/categories?keyword=${keyword}`,{params});
  }

  //8.get one product
  getCategory(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.basePath}/${id}`);
  }

  //7.Update Category
  updateCategory(category : Category):Observable<any>{
    return this.http.put(`${this.basePath}/update`,category,{responseType:'text'});
  }

  activeAndDeactive(id:any):Observable<any> {
    console.log ("id====is:::"+id);
    return this.http.get(this.basePath +'/inactive/' +id,{responseType:'text'});
  }


  saveCategory(category:Category):Observable<any>{
   console.log(JSON.stringify(category));
    return this.http.post(`${this.basePath}/categories/save`,category,{responseType:"text"});
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${this.basePath}/remove/${id}`,{responseType:'text'})
  }


  ExportPdf(id:number[]):Observable<any>{
    return this.http.get(this.basePath +'/pdf/'+id);
  }

  ExportExcel(id:number[]):Observable<any>{
    return this.http.get(this.basePath +'/customers.xlsx/'+id,{responseType:'blob'});

  }

  deleteProduct(ids:number[]):Observable<any>{
    return this.http.delete(`${this.basePath}/remove/${ids}`,{responseType:'text'})
  }
  
}
