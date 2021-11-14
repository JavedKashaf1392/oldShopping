import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../class/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user :User=new User();
  id   : number;
  message : any;

  constructor(private service:UserService,private activatedRouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id=this.activatedRouter.snapshot.params['id'];
    this.service.getUser(this.id).subscribe(
      data =>{
        this.user=data;
      }
    );
  }

  UpdateUser(){
    this.service.saveUser(this.user).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['allUser']);
        this.message=data;
      }
    );
  }
}
