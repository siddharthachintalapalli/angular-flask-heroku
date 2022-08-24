import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cluster-gender-dist',
  templateUrl: './cluster-gender-dist.component.html',
  styleUrls: ['./cluster-gender-dist.component.css']
})
export class ClusterGenderDistComponent implements OnInit {

  arr_comp:any=[0, 0, 0, 0];
  arr_male:any=[0, 0, 0, 0];
  arr_female:any=[0, 0, 0, 0];
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
        this.data = res.response;
      },
      error:()=>{
        console.log("Error while fetching cluster data");
      }
    })
    
    
    setTimeout(()=>{
      for(let i=0;i<this.data.length;i++){
        if(this.data[i][0]==1){
          this.arr_comp[this.data[i][7]]++;
        }
        if(this.data[i][1]==1){
          this.arr_male[this.data[i][7]]++;
        }
        if(this.data[i][2]==1){
          this.arr_female[this.data[i][7]]++;
        }
      }
      this.chartdata = {
        labels: [
          'Cluster1',
          'Cluster2',
          'Cluster3',
          'Cluster4'
        ],
        datasets: [{
          label: 'Comp',
          data: this.arr_comp,
          backgroundColor: 'rgb(255,0,0)',
        },
        {
          label: 'Female',
          data: this.arr_male,
          backgroundColor: 'rgb(0,0,255)',
        },
        {
          label: 'Male',
          data: this.arr_female,
          backgroundColor: 'rgb(0,255,0)',
        },]
      };
      this.chart = new Chart('canvas',{
        type: 'bar',
        data: this.chartdata,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Bar Chart - Stacked'
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false
            }
          }
        }
      })
    },4000)
    
    
    
  }

}
