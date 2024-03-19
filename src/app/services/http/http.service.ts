import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }

  postService(url:string, reqData:any, token:boolean=false, httpOtions:any={}){
    return this.httpClient.post(url,reqData,token && httpOtions);
  } 

  postServiceReset(url: string, reqData: any, token: boolean = true, httpOptions: any = {}) {
    return this.httpClient.post(url, reqData, token && httpOptions);
  }

  getService(url:string, token:boolean = true, httpOtions:any={}){
    return this.httpClient.get(url,token && httpOtions);
  }

  putService(url:string, reqData:any, token:boolean = true, httpOtions:any={}){
    return this.httpClient.put(url,reqData,token && httpOtions);
  }

  deleteService(url:string, token:boolean = true, httpOtions:any={}){
    return this.httpClient.delete(url,token && httpOtions);
  }

}
