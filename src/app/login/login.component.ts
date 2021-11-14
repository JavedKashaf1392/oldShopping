import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../class/user';
import { headerType } from '../enum/header-type.enum';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { GenericService } from '../service/generic.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  public showLoading:boolean;
  public subscription:Subscription[]=[];

  constructor(private fb:FormBuilder ,private router:Router,private authenticationService:AuthenticationServiceService,
    private notificationService:NotificationService,private generic:GenericService) { }
 

  ngOnInit(): void {
    // if(this.authenticationService.isLoggedIn()){
    //   this.router.navigateByUrl('allUser');
    // }else{
    //   this.router.navigateByUrl('/login');
    // }

    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }



  onLogin(){
    let obj = this.loginForm.value
    console.log(obj)
    this.authenticationService.LoginUser(obj).subscribe((
      response)=>{
        if(response.token){
          localStorage.setItem('currentUser',JSON.stringify(response));
          console.log("See Your Token In Login"+response.token);
          this.generic.token=response.token;
          localStorage.setItem('token',this.generic.token);
          // console.log(response);
          this.router.navigate(['/welcome/all']);
        }
      }
      )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
   }
}
