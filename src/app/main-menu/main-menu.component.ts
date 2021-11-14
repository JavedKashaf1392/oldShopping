import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../service/authentication-service.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { GenericService } from '../service/generic.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  public currentstatus:any;
  constructor(private authService:AuthenticationServiceService,public router:Router,public generic:GenericService){
    this.currentstatus=this.authService.getStatus().subscribe(currentstatus=>{
      this.currentstatus=currentstatus;
    })
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser')
    this.router.navigate(['login']);
  }

  route(params) {
    this.generic.selectedTab = params;
    this.router.navigate(['/welcome/' + params])
    console.log(params);
  }

  ngOnInit(): void {
  }
}
