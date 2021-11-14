import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{
 

  constructor(private authenticationService:AuthenticationServiceService) { }
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.authenticationService.host}/user/save`)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`${this.authenticationService.host}/user/roles`)) {
      return httpHandler.handle(httpRequest);
    }

    // if (httpRequest.url.includes(`${this.authenticationService.host}/category/categories`)) {
    //   return httpHandler.handle(httpRequest);
    // }


  this.authenticationService.loadToken();
  const token=this.authenticationService.getToken();
  console.log("see your token in interceptor"+token);
  const request=httpRequest.clone({ setHeaders: {Authorization:token}});
  console.log("final Request"+request);
  return httpHandler.handle(request);
  }   

}
