import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Category } from 'src/app/class/category';
import { AuthenticationServiceService } from 'src/app/service/authentication-service.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  public loginuser:any={};
  categorys : Category[];
  message : any;
  totalElements: number = 0;
  keyword : boolean=false;
  search :string;
  selectedId : string;
  id: number;
  msg: string;
	clss: string;
  id1:any
  // constructor(private service:CategoryService,private router:Router) { }

  // ngOnInit(): void {
  //   this.getAllCategories();
  // }



  // ngOnInit(): void {
  //   this.userService.getAllCategories().subscribe(data=>{
  //     this.categorys=data;
  //   })



    
  constructor(private service:CategoryService,private router:Router){}
  
  //1.get All Product and Search
  listCategory(search){
    this.keyword=search;
    if(this.keyword){
      this.getAllCategorysAllData(search,{ page: "0", size: "10"})
    }
    else{
      this.getAllCategorysData({ page: "0", size: "10"})
    }
  }
  getAllCategorysData(request){
    this.service.getAllCategory(request).subscribe(
      data => {
        console.log(data);
        this.categorys = data['list'];
        this.totalElements = data['totalItems'];
      },
      error => { 
        console.log(error);
      }      
    );
  }
//2.get all products based on search and Pagination
getAllCategorysAllData(search,request){
    this.service.getAllCategorysdata(search,request).subscribe(
      data => {
        // this.products = data;
        console.log(data);
        this.categorys = data['list'];
        this.totalElements = data['totalItems'];      
      },
      error => { 
        //on fail
        console.log(error);
      }      
    );
  }

  loadData(){
   this.getAllCategorysData({ page: "0", size: "10"})
   }

  //3.Check all checkboxes
  checkAllCheckBox1(ev:boolean) {
		this.categorys.forEach(x => x.checked = ev);
	}
  //4.activate and deactivate
  ActivateAndDeactivate(){
    const selectedId = this.categorys.filter(product => product.checked).map(p => p.id).toString();
	
		if(selectedId && selectedId.length > 0) {
      this.id1=selectedId;
      console.log ("id===="+typeof(this.id1));
			this.service.activeAndDeactive(this.id1)
				.subscribe(res => {
          this.getAllCategorysData({ page: "0", size: "10"});
          this.msg=res;
					}, err => {
            this.clss = 'rd';
						this.msg = 'Something went wrong during deleting products';
                    }
                );
		} else {
			this.clss = 'rd';
			this.msg = 'You must select at least one product';
		}
  }

  //5.delete Products
  delete(): void {
		const selectedId = this.categorys.filter(category => category.checked).map(p => p.id).toString();
		console.log (selectedId);
		if(selectedId  && selectedId .length > 0) {
			this.service.delete(selectedId)
				.subscribe(res => {
          this.getAllCategorysData({ page: "0", size: "10"});
          this.message=res;
					}, err => {
            this.clss = 'rd';
						this.msg = 'Something went wrong during deleting products';
                    }
                );
		} else {
			this.clss = 'rd';
			this.msg = 'You must select at least one product';
		}
	}

  //6.Update the Category
  Update(){
    this.selectedId = this.categorys.filter(category => category.checked).map(c => c.id).toString();
    console.log(this.selectedId);
    if(this.selectedId && this.selectedId.length > 0) {
      console.log("Selected Id is here:::"+this.selectedId);
      this.router.navigate(['/welcome/editCategory',this.selectedId]);
    } else {
this.clss = 'rd';
this.msg = 'You must select at least one product';
}
  }


   //Export Pdf Products
GeneratePdf(): void {
  const selectedProducts = this.categorys.filter(product => product.checked).map(p => p.id);
  console.log (selectedProducts);
  if(selectedProducts && selectedProducts.length > 0) {
    this.service.ExportPdf(selectedProducts)
      .subscribe(res => {
        this.getAllCategorysData({ page: "0", size: "10"});
        this.message=res;
        }, err => {
          this.clss = 'rd';
          this.msg = 'Something went wrong during deleting products';
                  }
              );
  } else {
    this.clss = 'rd';
    this.msg = 'You must select at least one product';
  }
}


GenerateExcel(){
  const selectedProducts = this.categorys.filter(product => product.checked).map(p => p.id);
  console.log (selectedProducts);
  if(selectedProducts && selectedProducts.length > 0) {
    this.service.ExportExcel(selectedProducts)
      .subscribe(response => {
        // this.getAllProductsData({ page: "0", size: "10"});
        // this.message=res;
        this.downloadFile(response);
        }, err => {
          this.clss = 'rd';
          this.msg = 'Something went wrong during deleting products';
                  }
              );
  } else {
    this.clss = 'rd';
    this.msg = 'You must select at least one product';
  }
}
downloadFile(data: Blob) { 
  const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; 
  const blob = new Blob([data], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  window.open(url);
}

   ngOnInit(): void {
    this.getAllCategorysData({ page: "0", size: "10" });
  }
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getAllCategorysData(request);
  }
}

