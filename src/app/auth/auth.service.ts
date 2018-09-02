import { Injectable } from '@angular/core';
import { AuthData } from './models/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AuthService {
  private isAuthenticated = false;
  public authChange = new Subject<boolean>();
  public auth: any;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    this.afAuth.authState.subscribe(user => {
      this.auth = user;
    });
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
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
      .then(result => {})
      .catch(error => {
        this.snackBar.open(error.message, undefined, { duration: 3000 });
      });
  }

  login(auth: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(auth.email, auth.password)
      .then(result => {})
      .catch(error => {
        this.snackBar.open(error.message, undefined, { duration: 3000 });
      });
  }

  forogotPassword(email: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() =>
        this.snackBar.open(
          'Password Reset link sent to your registred mail',
          undefined,
          { duration: 3000 }
        )
      )
      .catch(error => console.log(error));
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (email.length === 0 && !EMAIL_REGEXP.test(email)) {
      return false;
    }

    return true;
  }

  logout() {
    // this.sharedService.setCookie('email', '', -1);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
