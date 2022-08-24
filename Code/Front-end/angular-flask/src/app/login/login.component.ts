import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginUser } from './loginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userModel = new LoginUser('');
  constructor(private http:HttpClient, private router:Router, private api:ApiService){}

  ngOnInit(): void {
  }

  login(){
    console.log(this.userModel);
    this.api.loginUser(this.userModel.CustID)
    .subscribe(
      res=>{
        if(res['response']==="No record found"){
          alert('Invalid ID');
          this.router.navigate(['login']);
        }else{
          localStorage.setItem("id",res.response[1]);
          this.router.navigate(['insights'])
        }
        console.log(res);
        
      },
      err=>console.log(err)
    )
  }

}
