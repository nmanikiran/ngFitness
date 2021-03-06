import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SharedService } from '../../shared/shared.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) {
    const emailAddress = this.sharedService.getCookie('email') || '';
    this.loginForm = new FormGroup({
      email: new FormControl(emailAddress, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      remember: new FormControl(false, {})
    });
  }

  ngOnInit() {}

  get fControls() {
    return this.loginForm.controls;
  }

  singin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.value.remember) {
      this.sharedService.setCookie('email', this.loginForm.value.email, 1);
    }
    const { email, password } = this.loginForm.value;
    this.auth.login({ email, password });
  }

  forogtPassword() {
    const isValidEmail = this.auth.isValidMailFormat(
      this.loginForm.value.email
    );
    if (isValidEmail) {
      this.auth.forogotPassword(this.loginForm.value.email);
    } else {
      this.snackBar.open('Enter email address', undefined, { duration: 3000 });
    }
  }
}
