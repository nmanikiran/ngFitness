import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngFitness';
  themeName = 'indigo';
  constructor(private auth: AuthService) {}

  logout() {}
  ngOnInit() {
    this.auth.initAuthListener();
  }
  changeTheme(e: string) {
    this.themeName = e;
  }
}
