import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthData } from './models/auth-data.model';
import { User } from './models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user: User;
  public authChange = new Subject<boolean>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(auth: AuthData) {
    this.user = {
      email: auth.email,
      userId: Date.now()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  login(auth: AuthData) {
    this.user = { email: auth.email, userId: Date.now() };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/']);
  }

  getUser() {
    return { ...this.user };
  }
  isAuth() {
    return this.user != null;
  }
}
