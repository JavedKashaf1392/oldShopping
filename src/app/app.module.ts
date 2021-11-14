import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ListCategoryComponent } from './Category/list-category/list-category.component';
import { EditCategoryComponent } from './Category/edit-category/edit-category.component';
import { CreateCategoryComponent } from './Category/create-category/create-category.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { SearchComponent } from './search/search.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from'@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HttpIntercepterService } from './intercepter/http-intercepter.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationServiceService } from './service/authentication-service.service';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { TestComponent } from './test/test.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MenuComponent } from './Home/menu/menu.component';

const customNotifierOptions: NotifierOptions = {
  position: {
        horizontal: {
            position: 'left',
            distance: 150
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10
        }
    },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    MainMenuComponent,
    UserCreateComponent,
    UserListComponent,
    UserEditComponent,
    ListCategoryComponent,
    EditCategoryComponent,
    CreateCategoryComponent,
    ShowdataComponent,
    SearchComponent,
    LoginComponent,
    TestComponent,
    MenuComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule,
    MatIconModule,
    MatFormFieldModule,
    NotifierModule.withConfig(customNotifierOptions),
    MatInputModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule

  ],
   providers: [AuthenticationGuard,AuthenticationServiceService,

   {provide:HTTP_INTERCEPTORS,useClass:HttpIntercepterService,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
