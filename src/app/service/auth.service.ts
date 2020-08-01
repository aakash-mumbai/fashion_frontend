import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['admin']);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
