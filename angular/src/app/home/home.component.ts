import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  username = '';
  password = '';
  message: string;

  constructor(private router: Router, private loginService: AuthenticationService) { }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  get loggedUser(): string {
    return this.loginService.getUser();
  }

  checkLogin(): boolean {
    this.message = '';
    if (!this.loginService.login(this.username, this.password)) {
      this.message = 'Invalid Login';
      setTimeout(() => {
        this.message = '';
      }, 2500);
      return false;
    }
    return true;
  }

  logout(): boolean {
    this.loginService.logout();
    return true;
  }

}
