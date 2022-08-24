import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from './users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userModel = new User('','','','','','','','','','');
  constructor(private http:HttpClient, private router:Router,private _auth:ApiService){}

  registerUser(){
    console.log(this.userModel);
    this._auth.addData(this.userModel)
    .subscribe(
      res=>{
        console.log(res)
        // localStorage.setItem("token",res.token);
        this.router.navigate(['']);
      },
      err=>console.log(err)
    )
  }
  ngOnInit(): void {
    
  }

}
