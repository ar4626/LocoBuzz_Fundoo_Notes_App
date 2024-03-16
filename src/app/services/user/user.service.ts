import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token : any;
  constructor(private httpService : HttpService)
  {
    // this.token = localStorage?.getItem('token');
  }

  register(reqData: any){
    let header = {
      headers: new HttpHeaders({
          'content-type': 'application/json',
          // 'Authorization': 'token'
      })
    }
    return this.httpService.postService('https://localhost:44352/api/User/Register',reqData,false,header)
  }
  
  login(reqData: any){
    let header = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
        // 'Authorization':'Bearer ' + token 
      })
    }
    return this.httpService.postService('https://localhost:44352/api/User/Login',reqData,false,header)
  }
  
  forgetPassword(requestData: any){
    let header = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
        // 'Authorization': 'token' 
      })
    }
    return this.httpService.postService('https://localhost:44352/api/User/ForgetPassword?Email='+requestData.email,{},false,header)
  }

  reset(requestData: any, token: any){
    let header = {
      headers : new HttpHeaders({
        'content-type': 'application/json',
        'Authorization':'Bearer ' + token 
      })
    }
    return this.httpService.postServiceReset('https://localhost:44352/api/User/ResetPassword',requestData,true,header)
  }

 
}
