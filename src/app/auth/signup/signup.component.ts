import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.maxDate = new Date();

    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  singup(f: NgForm) {
    console.log('singup', f.value);
    this.auth.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }
}