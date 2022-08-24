import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  access:boolean=false;
  id:any=localStorage.getItem('id');
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(this.id==='AdminFlaskCRUD'){
      this.access=true;
    }
    if(!this.id){
      this.router.navigate(['']);
    }
  }

  insights() {
    this.router.navigate(['insights']);
  }
  profile() {
    this.router.navigate(['profile']);
  }
  admin() {
    this.router.navigate(['admin']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
