import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Product } from '../class/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns:string[]=['productName','productPrice','productQyt','discount','size','tax'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  products : Product[];
  message : any;
  totalElements:number = 0;
  keyword : boolean=false;
  search :string;
  selectedId : string;
  id: number;
  msg: string;
	clss: string;
  id1:any

  constructor(private service:ProductService,private router:Router){}
  ngOnInit() {

    this.ProductAllDataForTable();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  //get the companyAllData for the forms
  ProductAllDataForTable() {
    this.service.getAllProducts().subscribe((data) => {
      let listData = data["list"];
      console.log("Data for testing",listData);
      this.dataSource = new MatTableDataSource(listData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}




//   //3.Check all checkboxes
//   checkAllCheckBox1(ev:boolean) {
// 		this.products.forEach(x => x.checked = ev);
// 	}
//   //4.activate and deactivate
//   ActivateAndDeactivate(){
//     const selectedId = this.products.filter(product => product.checked).map(p => p.id).toString();

// 		if(selectedId && selectedId.length > 0) {
//       this.id1=selectedId;
//       console.log ("id===="+typeof(this.id1));
// 			this.service.activeAndDeactive(this.id1)
// 				.subscribe(res => {
//           this.getAllProductsData({ page: "0", size: "10"});
//           this.msg=res;
// 					}, err => {
//             this.clss = 'rd';
// 						this.msg = 'Something went wrong during deleting products';
//                     }
//                 );
// 		} else {
// 			this.clss = 'rd';
// 			this.msg = 'You must select at least one product';
// 		}
//   }


//   //6.Update the products
//   UpdateProducts(){
//     this.selectedId = this.products.filter(product => product.checked).map(p => p.id).toString();
//     var num= 1;
//     console.log(this.selectedId);
//     if(this.selectedId && this.selectedId.length > 0) {
//       console.log("Selected Id is here:::"+this.selectedId);
//       this.router.navigate(['/welcome/edit',this.selectedId]);
//     } else {
// this.clss = 'rd';
// this.msg = 'You must select at least one product';
// }
//   }


//    //Export Pdf Products
// GeneratePdf(): void {
//   const selectedProducts = this.products.filter(product => product.checked).map(p => p.id);
//   console.log (selectedProducts);
//   if(selectedProducts && selectedProducts.length > 0) {
//     this.service.ExportPdf(selectedProducts)
//       .subscribe(res => {
//         this.getAllProductsData({ page: "0", size: "10"});
//         this.message=res;
//         }, err => {
//           this.clss = 'rd';
//           this.msg = 'Something went wrong during deleting products';
//                   }
//               );
//   } else {
//     this.clss = 'rd';
//     this.msg = 'You must select at least one product';
//   }
// }


// GenerateExcel(){
//   const selectedProducts = this.products.filter(product => product.checked).map(p => p.id);
//   console.log (selectedProducts);
//   if(selectedProducts && selectedProducts.length > 0) {
//     this.service.ExportExcel(selectedProducts)
//       .subscribe(response => {
//         // this.getAllProductsData({ page: "0", size: "10"});
//         // this.message=res;
//         this.downloadFile(response);
//         }, err => {
//           this.clss = 'rd';
//           this.msg = 'Something went wrong during deleting products';
//                   }
//               );
//   } else {
//     this.clss = 'rd';
//     this.msg = 'You must select at least one product';
//   }
// }
// downloadFile(data: Blob) {
//   const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//   const blob = new Blob([data], { type: contentType });
//   const url = window.URL.createObjectURL(blob);
//   window.open(url);
// }

//    ngOnInit(): void {
//     this.getAllProductsData({ page: "0", size: "10" });
//   }
//   nextPage(event: PageEvent) {
//     const request = {};
//     request['page'] = event.pageIndex.toString();
//     request['size'] = event.pageSize.toString();
//     this.getAllProductsData(request);
//   }
// }



  //  editProduct(id:number){
  //      //moving to Edit Component
  //  this.router.navigate(['edit',id]);
  //  }

 // deleteProduct(ids:number){
  //    console.log("deleted"+id);
  //   this.service.deleteProduct(ids).subscribe(
  //     data =>{
  //       this.message=data;
  //        this.getAllProductsData({ page: "0", size: "10"});
  //     },
  //     error =>{
  //     console.log(error);
  //     }

  //   );
  //  }


  // checkAllCheckBox(ev) {
	// 	this.products.forEach(x => x.checked = ev.target.checked)
	// }

