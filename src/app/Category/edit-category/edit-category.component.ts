import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/class/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category : Category = new Category();
  message : any;
  categorylist :any;
  CategoryForm:FormGroup;
  id      : number;

  // categoryForm:Category=new Category();
  constructor(private fb:FormBuilder,private service:CategoryService,
    private router:Router,private snackbar:MatSnackBar,private aRoute:ActivatedRoute) { }
    durationInSeconds = 5;
  ngOnInit(): void {
   //read ID given by List Component on click Edit
let categoryId=this.aRoute.snapshot.params['id'];
if(categoryId){

  //call service and subscribe success data to student
this.service.getCategory(categoryId).subscribe(
  data =>{
    this.category=data;
    this.patchData(data);
   
  }
  );
}


    this.CategoryForm = this.fb.group({
      id:[''],
      name:['',Validators.required],
      alias:['',Validators.required],
      image:['',Validators.required],
      //enabled:['',Validators.required],
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

  //patch data
  patchData(res){
    let obj= res;
    let data
    console.log("inside null values chekcing"+obj.parent);
      console.log(obj);
      if(obj.parent===null){
        data=obj.parent;
        console.log("inside null values chekcing"+data)
      }else{
        data=obj.parent.id
        console.log("inside the patchDAta:::"+data)
      }
      this.CategoryForm['controls']['id'].patchValue(obj.id);
      this.CategoryForm['controls']['name'].patchValue(obj.name);
      this.CategoryForm['controls']['alias'].patchValue(obj.alias);
      this.CategoryForm['controls']['image'].patchValue(obj.image);
      this.CategoryForm['controls']['parent'].patchValue(data);
    }

  UpdateCategory(){
    let obj=this.CategoryForm.value;
    this.CategoryForm.reset();
    this.service.updateCategory(obj).subscribe(
      data =>{
       this.message=data;
       console.log(data);
        this.ListCategoryForms();
        this.router.navigate(['/welcome/allCategory'])
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
