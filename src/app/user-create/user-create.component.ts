import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../class/user';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})


export class UserCreateComponent implements OnInit,OnDestroy {

  // public roles1=[
  //   {name:"ADMIN",description:"All Roles Can done"},
  //   {name:"USER",description:"User can see the product and edit"},
  //   {name:"CUSTOMER",description:"can buy the product"},
  //   {name:"DELIVERY",description:"can bring the all materials"}
  // ]

  roles1:any;

public RegisterForm:any;
public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private fb:FormBuilder, private router: Router, private authenticationService: AuthenticationServiceService,
              private notificationService: NotificationService,private userService:UserService) {}

              ngOnInit(): void {
                this.RegisterForm = this.fb.group({
                  id:['',Validators.required],
                  firstName:['',Validators.required],
                  lastName:['',Validators.required],
                  email:['',Validators.required],
                  password:['',Validators.required],
                  photos:['',Validators.required],
                  roles:['',Validators.required]
                })
                this.getAllRoles();
              }

        
  public RegisterLogin(): void {
    let obj = this.RegisterForm.value
    console.log(JSON.stringify(obj));

    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.saveUser(obj).subscribe(
        (response: User) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new account was created for ${response.firstName}.
          Please check your email for password to log in.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  getAllRoles(){
    this.userService.AllRoles().subscribe(
      data=>{
     this.roles1=data
      },error=>{
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


 











}
