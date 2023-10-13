import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

//  export const authGuard: CanActivateFn = (route, state) => {

//     return true;
//   };

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    if(this.authService.isLoggedIn) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;

  }
};
