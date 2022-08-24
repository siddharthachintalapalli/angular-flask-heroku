import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data:any;
  constructor(private api:ApiService, private router:Router) { }
  id:any = localStorage.getItem('id');
  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(['']);
    }

    this.api.getProfileData(this.id)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.data = res;
      },
      error:()=>{
        console.log("Error while fetching profile data");
      }
    })
  }
  

}
