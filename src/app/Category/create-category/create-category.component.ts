import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  category : Category = new Category();
  message : any;
  categorylist :any;
  CategoryForm:FormGroup;
  
  // categoryForm:Category=new Category();
  constructor(private fb:FormBuilder,private service:CategoryService,
    private router:Router,private snackbar:MatSnackBar) { }

    durationInSeconds = 5;

  ngOnInit(): void {
    this.CategoryForm = this.fb.group({
      name:['',Validators.required],
      alias:['',Validators.required],
      image:['',Validators.required],
      // enabled:['',Validators.required],
      parent:['',Validators.required],
    })
    this.ListCategoryForms();
  }
  ListCategoryForms(){
    this.service.getAllCategoriesForms().subscribe(
      data=>{
        this.categorylist=data;
        console.log(data);
      },error=>{
        console.log(error);
      }
    )
  }

  saveCategory(){
    let obj=this.CategoryForm.value;
    this.CategoryForm.reset();
    this.service.saveCategory(obj).subscribe(
      data =>{
       this.message=data;
       console.log(data);
        this.ListCategoryForms();
        console.log('save data is here'+data);
       this.snackbar.open(data,'',{
         duration:5000,
         verticalPosition:'bottom'
       })
      },error =>{
       console.log(error);
      }
    );
  }
}


