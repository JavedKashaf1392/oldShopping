import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Product } from '../class/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product : Product = new Product();
  id      : number;
  message : any;
  constructor(private service:ProductService,private router:Router,private activatedRoute:ActivatedRoute) { }
 
  ngOnInit(): void {
//read ID given by List Component on click Edit
this.id=this.activatedRoute.snapshot.params['id'];
   //call service and subscribe success data to student
   this.service.getProduct(this.id).subscribe(
    data =>{
      this.product=data;
      console.log(data);

    }
  );
  }
  
  updateProduct(){
    this.service.updateProduct(this.product).subscribe(
      data => {
        console.log("posting data is here"+data);
        this.router.navigate(['all']);
      },
      error =>{
        console.log(error);
      }
      );}




}
