import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cluster-dist',
  templateUrl: './cluster-dist.component.html',
  styleUrls: ['./cluster-dist.component.css']
})
export class ClusterDistComponent implements OnInit {
  arr=[0,0,0,0];
  arr_x:any=[];
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
        if(this.data[i][7]==0){
          this.arr[this.data[i][7]]++;
        }
        if(this.data[i][7]==1){
          this.arr[this.data[i][7]]++;
        }
        if(this.data[i][7]==2){
          this.arr[this.data[i][7]]++;
        }
        if(this.data[i][7]==3){
          this.arr[this.data[i][7]]++;
        }
      }
      this.arr_x[0]=this.arr[0]/(this.arr[0]+this.arr[1]+this.arr[2]+this.arr[3])*100;
      this.arr_x[1]=this.arr[1]/(this.arr[0]+this.arr[1]+this.arr[2]+this.arr[3])*100;
      this.arr_x[2]=this.arr[2]/(this.arr[0]+this.arr[1]+this.arr[2]+this.arr[3])*100;
      this.arr_x[3]=this.arr[3]/(this.arr[0]+this.arr[1]+this.arr[2]+this.arr[3])*100;
      console.log(this.arr_x);
      this.chartdata = {
        labels: [
          'Cluster1',
          'Cluster2',
          'Cluster3',
          'Cluster4'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: this.arr_x,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0,255,0)'
          ],
          hoverOffset: 4
        }]
      };
      this.chart = new Chart('canvas',{
        type: 'doughnut',
        data: this.chartdata,
      })
    },4000)
    
    
    
  }
  
  

}
