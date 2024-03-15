import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/Auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{
  constructor(
    private auth : AuthService,
    private route : Router
  ){};

  canActivate(): boolean {
    if(! this.auth.gettoken()){
      this.route.navigateByUrl('/login');
    }
    return this.auth.gettoken();
  }
}


// export const authgaurdGuard: CanActivateFn = (route, state) => {
//   return true;
// };
