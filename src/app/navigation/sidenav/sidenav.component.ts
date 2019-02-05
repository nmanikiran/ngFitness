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
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output()
  sidenavClose = new EventEmitter();
  isAuth = false;
  authChangeSubsciption: Subscription = new Subscription();
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authChangeSubsciption = this.authService.authChange.subscribe(
      status => {
        this.isAuth = status;
      }
    );
  }
  closeSideNav() {
    this.sidenavClose.emit();
  }
  ngOnDestroy() {
    this.authChangeSubsciption.unsubscribe();
  }
  logout() {
    this.closeSideNav();
    this.authService.logout();
  }
}
