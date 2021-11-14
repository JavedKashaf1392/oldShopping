import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './Category/create-category/create-category.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { ListCategoryComponent } from './Category/list-category/list-category.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { MenuComponent } from './Home/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [

  {path : 'login',component:LoginComponent},
  {path : 'createUser', component : UserCreateComponent},
  {path : '' , redirectTo : 'login', pathMatch : 'full'},
  {path: 'welcome', component: MenuComponent, children: [
  {path : 'allCategory', component:ListCategoryComponent},
   //user data is starting here
   {path : 'allUser' , component : UserListComponent,canActivate:[AuthenticationGuard]},
   {path : 'editUser/:id', component:UserEditComponent},
   //login
   {path : 'search/:keyword', component:UserListComponent},
   {path : 'all' , component : ProductListComponent,canActivate:[AuthenticationGuard]},
   {path : 'create', component : ProductCreateComponent,canActivate:[AuthenticationGuard]},
   {path : 'edit/:id', component:ProductEditComponent},

   //Category data
   {path : 'allCategory' , component : ListCategoryComponent,canActivate:[AuthenticationGuard]},
   {path : 'createCategory', component : CreateCategoryComponent,canActivate:[AuthenticationGuard]},
   {path : 'editCategory/:id', component:EditCategoryComponent},
   {path : '' , redirectTo : 'login', pathMatch : 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
