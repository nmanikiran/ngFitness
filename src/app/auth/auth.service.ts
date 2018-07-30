import { Injectable } from '@angular/core';
import { AuthData } from './models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  public authChange = new Subject<boolean>();
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/']);
      }
    });
  }
  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(
        authData.email,
        authData.password
      )
      .then(result => {
        // console.log(result);
      })
      .catch(error => {
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  login(auth: AuthData) {
    this.afAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(auth.email, auth.password)
      .then(result => {})
      .catch(error => {
        this.snackBar.open(error.message, null, { duration: 3000 });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
