import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {noop} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  redirectUrl: string;

  constructor(private router: Router) { }

  login(user: string, password: string): boolean{
    if (user === 'nurse' && password === 'password' || user === 'doctor' && 'password'){
      sessionStorage.setItem('username', user);
      if (this.redirectUrl) {
        this.router.navigate([this.redirectUrl]).then(noop);
      }
      this.redirectUrl = null;
      return true;
    }
    return false; // fail to log in
  }

  logout(): any {
    sessionStorage.removeItem('username');
  }

  getUser(): any {
    return sessionStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }


}
