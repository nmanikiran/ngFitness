import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      isAgreed: [null, Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get fControls() {
    return this.registerForm.controls;
  }

  singup() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.auth.registerUser(this.registerForm.value);
  }
}
