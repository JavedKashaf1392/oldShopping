import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../class/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product : Product=new Product();
  message : any;

  constructor(private service:ProductService,private router:Router) {}

  ngOnInit(): void {

  }
  saveProduct(){
    this.service.saveProduct(this.product).subscribe(
      data => {
        console.log(data);
        this.message=data;
      },
      error =>{
        console.log(error);
      }
      );
  }






}
