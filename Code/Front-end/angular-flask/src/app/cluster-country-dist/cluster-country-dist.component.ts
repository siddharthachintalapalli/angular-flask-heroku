import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cluster-country-dist',
  templateUrl: './cluster-country-dist.component.html',
  styleUrls: ['./cluster-country-dist.component.css']
})
export class ClusterCountryDistComponent implements OnInit {

  arr_germany:any=[0, 0, 0, 0];
  arr_uk:any=[0, 0, 0, 0];
  arr_us:any=[0, 0, 0, 0];
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
        if(this.data[i][3]==1){
          this.arr_germany[this.data[i][7]]++;
        }
        if(this.data[i][4]==1){
          this.arr_uk[this.data[i][7]]++;
        }
        if(this.data[i][5]==1){
          this.arr_us[this.data[i][7]]++;
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
          label: 'Germany',
          data: this.arr_germany,
          backgroundColor: 'rgb(255,0,0)',
        },
        {
          label: 'United Kingdom',
          data: this.arr_uk,
          backgroundColor: 'rgb(0,0,255)',
        },
        {
          label: 'United States',
          data: this.arr_us,
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
