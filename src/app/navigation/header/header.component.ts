import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter();
  isAuth = false;
  authChangeSubsciption: Subscription;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.authChange.subscribe(status => {
      this.isAuth = status;
    });
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
  }
  ngOnDestroy() {
    this.authChangeSubsciption.unsubscribe();
  }
  logout() {
    this.auth.logout();
  }
}
