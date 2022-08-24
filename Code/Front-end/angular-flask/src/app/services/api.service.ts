import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  create_url:string = "https://flaskcrudml.herokuapp.com/new_user/";
  get_url:string = "https://flaskcrudml.herokuapp.com/read/";
  update_url:string = "https://flaskcrudml.herokuapp.com/modify_user/";
  delete_url:string = "https://flaskcrudml.herokuapp.com/delete_user/";
  login_url:string = "https://flaskcrudml.herokuapp.com/login/";
  insights_url:string = "https://flaskcrudml.herokuapp.com/k_means_clustering/";

  constructor(private http: HttpClient) { }

  clusterData(){
    return this.http.get<any>(this.insights_url);
  }

  addData(data:any){
    return this.http.post<any>(this.create_url,data);
  }
  getAllData(){
    return this.http.post<any>(this.get_url,{"CustID":0});
  }

  getProfileData(id:string){
    return this.http.post<any>(this.get_url,{"CustID":id});
  }

  updatedata(data:any,id:string){
    console.log(data);
    return this.http.post<any>(this.update_url+id,data);
  }

  deletedata(id:string){
    return this.http.post<any>(this.delete_url,{"CustID":id});
  }
  loginUser(id:string){
    return this.http.post<any>(this.login_url,{"CustID":id});
  }
}
