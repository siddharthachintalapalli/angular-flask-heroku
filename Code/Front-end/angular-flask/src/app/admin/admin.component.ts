import { Component, OnInit, ViewChild } from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['CardID', 'CustID', 'Title', 'Country','Address','PostalCode','City','Mail','BirthDate','ValidityDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog, private api:ApiService,private router:Router ) { }

  ngOnInit(): void {
    if(!localStorage.getItem('id')){
      this.router.navigate(['']);
    }
    this.getData();
  }
  openDialog() {
    this.dialog.open(FormComponent,{
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getData(); 
      }
    })
  }

  getData(){
    this.api.getAllData()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.response);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log("Error while fetching data");
        console.log(err);
      }
    })
  }

  update(row:any){
    this.dialog.open(FormComponent,{
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getData(); 
      }
    })
  }
  delete(row:any){
    this.api.deletedata(row[1])
    .subscribe({
      next:(res)=>{
        alert("Data deleted");
        if(row[1]===localStorage.getItem('id')){
          this.router.navigate(['']);
        }
        this.getData();
      },
      error:()=>{
        alert("Erorr while deleting");
      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
