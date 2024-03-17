import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'http://localhost:44352/api';

  constructor(private httpClient : HttpClient) { }

  postService(url:string, reqData:any, token:boolean=false, httpOtions:any={}){
    return this.httpClient.post(url,reqData,token && httpOtions);
  } 

  postServiceReset(url:string, reqData:any, token:boolean = true, httpOtions:any={}){
    this.httpClient.post(url,reqData,token && httpOtions);
  }

  getService(url:string, token:boolean = true, httpOtions:any={}){
    return this.httpClient.get(this.baseUrl+url,token && httpOtions);
  }

  putService(url:string, reqData:any, token:boolean = true, httpOtions:any={}){
    return this.httpClient.put(this.baseUrl+url,reqData,token && httpOtions);
  }

}
