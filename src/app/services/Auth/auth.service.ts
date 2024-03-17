import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // gettoken(){
  //   return !! localStorage.getItem("token");
  //   // 
  // }

  gettoken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("token");
    }
    return false; // Return false if localStorage is not available
  }
}
