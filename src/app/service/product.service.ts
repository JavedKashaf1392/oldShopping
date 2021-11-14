import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../class/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  basePath : string='http://localhost:8585/product';

  constructor(private http:HttpClient) { }



  getAllProducts(){
    return this.http.get(this.basePath +'/all');

    // return this.http.get<User[]>(`${this.basePath}/alll?keyword=${keyword}`);
  }

  // getAllProductsdata(){
  //   return this.http.get(`${this.basePath}/product/all`);
  // }

  deleteProduct(ids:number[]):Observable<any>{
    return this.http.delete(`${this.basePath}/remove/${ids}`,{responseType:'text'})
  }

  ExportPdf(id:number[]):Observable<any>{
    return this.http.get(this.basePath +'/pdf/'+id);
  }

  ExportExcel(id:number[]):Observable<any>{
    return this.http.get(this.basePath +'/customers.xlsx/'+id,{responseType:'blob'});

  }

  saveProduct(product : Product):Observable<any>{
    return this.http.post(`${this.basePath}`,product,{responseType:'text'})
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.basePath}/${id}`);
  }

  updateProduct(product : Product):Observable<any>{
    return this.http.put(`${this.basePath}/update`,product,{responseType:'text'});
  }

  activeAndDeactive(id:any):Observable<any> {
    console.log ("id====is:::"+id);
    return this.http.get(this.basePath +'/inactive/' +id,{responseType:'text'});
  }
}
