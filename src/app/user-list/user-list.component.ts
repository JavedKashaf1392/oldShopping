import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { User } from '../class/user';
import { Userdatasource } from '../class/userdatasource';
import { GenericService } from '../service/generic.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];
  message : any;
  public keyword : string;
  search :string;

  displayedColumns = ['checked','firstName', 'lastName', 'email','photos','enabled','roles'];
  todoDatasource: Userdatasource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);

  constructor(private service:UserService,private router:Router,
    private activatedRouter:ActivatedRoute,private generic:GenericService) {

     }

     loadData(){
      this.todoDatasource.loadTodos(this.search,this.paginator.pageIndex, this.paginator.pageSize)
     }

     listProducts(search){
      this.keyword=search;
      if(this.keyword){
        this.todoDatasource.loadTodos(search,this.paginator.pageIndex, this.paginator.pageSize)
      }
    }

  ngOnInit(): void {
    //  this.listProducts(this.search);
    this.todoDatasource = new Userdatasource(this.service);
    this.todoDatasource.loadTodos(this.keyword);
  }




    /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.users.forEach(row => this.selection.select(row));
  }




  //1.get All Product and Search
  ngAfterViewInit() {
    this.todoDatasource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
    this.paginator.page
      .pipe(
        tap(() => this.loadTodos())
      )
      .subscribe();
  }

  loadTodos() {

    console.log("its inside the"+this.search)
    this.todoDatasource.loadTodos(this.keyword,this.paginator.pageIndex, this.paginator.pageSize);
  }


  deleteUser(id : number){
    this.service.DeleteUser(id).subscribe(
      data=>{
      console.log("User id::"+id);
      this.message=data;
      // this.getAllUsers();
      }
      ,error =>{
        console.log(error);
      }
    )
  }

  editProduct(id:number){
    this.router.navigate(['/welcome/editUser',id]);
  }
}



