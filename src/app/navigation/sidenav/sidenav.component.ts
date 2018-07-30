import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() sidenavClose = new EventEmitter();
  isAuth: boolean;
  authChangeSubsciption: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.authChange.subscribe(status => {
      this.isAuth = status;
    });
  }
  closeSideNav() {
    this.sidenavClose.emit();
  }
  ngOnDestroy() {
    this.authChangeSubsciption.unsubscribe();
  }
  logout() {
    this.closeSideNav();
    this.auth.logout();
  }
}
