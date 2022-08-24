import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-gender-dist',
  templateUrl: './gender-dist.component.html',
  styleUrls: ['./gender-dist.component.css']
})
export class GenderDistComponent implements OnInit {
  arr=[0,0,0];
  chart:any;
  data:any;
  chartdata:any;
  
  constructor(private api:ApiService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    
      this.api.clusterData()
    .subscribe({
      next:(res)=>{
        // console.log(res.response.length);
        this.data = res.response;
      },
      error:()=>{
        console.log("Error while fetching cluster data");
      }
    })
    
    
    setTimeout(()=>{
      for(let i=0;i<this.data.length;i++){
        if(this.data[i][0]==1){
          this.arr[0]++;
        }
        if(this.data[i][1]==1){
          this.arr[1]++;
        }
        if(this.data[i][2]==1){
          this.arr[2]++;
        }
      }
      console.log(this.arr);
      this.chartdata = {
        labels: [
          'Comp.',
          'Female',
          'Male'
        ],
        datasets: [
          {
            label: 'Gender',
            data: this.arr,
            borderColor: 'rgb(54, 162, 235)',
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          }
        ]
      };
      this.chart = new Chart('canvas',{
        type: 'line',
        data: this.chartdata,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true
            }
          }
        }
      })
    },4000)
    
    
    
  }
}
