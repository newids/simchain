import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {AuthService} from '../../interface';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
    // if (localStorage.getItem('isLoggedin')) {
    //     return true;
    // }
    //
    // this.router.navigate(['/login']);
    // return false;
  }
}
