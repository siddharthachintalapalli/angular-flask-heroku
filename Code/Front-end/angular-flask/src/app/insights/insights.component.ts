import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  
  bool1:boolean=true;
  bool2:boolean=false;
  bool3:boolean=false;
  bool4:boolean=false;
  bool5:boolean=false;

  constructor(private router:Router, private api:ApiService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(['']);
    }

  }
  cluster_dist() {
    this.bool1=true;
    this.bool2=false;
    this.bool3=false;
    this.bool4=false;
    this.bool5=false;
  }
  gender_dist() {
    this.bool2=true;
    this.bool1=false;
    this.bool3=false;
    this.bool4=false;
    this.bool5=false;
  }
  
  cluster_gender_dist(){
    this.bool3=true;
    this.bool1=false;
    this.bool2=false;
    this.bool4=false;
    this.bool5=false;
  }
  country_dist() {
    this.bool4=true;
    this.bool1=false;
    this.bool2=false;
    this.bool3=false;
    this.bool5=false;
  }
  cluster_country_dist(){
    this.bool5=true;
    this.bool1=false;
    this.bool2=false;
    this.bool3=false;
    this.bool4=false;
  }

}
