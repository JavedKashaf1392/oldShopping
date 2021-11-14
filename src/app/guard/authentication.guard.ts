import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
   
  constructor(private authenticationService:AuthenticationServiceService,private router:Router
    ,private notificationService:NotificationService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn():boolean{
    // if(this.authenticationService.LoginUser()){
    //   return true;
    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['/login']);
    this.notificationService.notify(NotificationType.ERROR,`You need to logni to access this page`.toUpperCase());
    return false;
  }
  
}
