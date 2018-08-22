import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  sidenavToggle = new EventEmitter();
  @Output()
  changeColor = new EventEmitter();
  isAuth = false;
  authChangeSubsciption: Subscription;

  colors = [{ color: 'purple' }, { color: 'pink' }];
  constructor(private auth: AuthService) {}

  changeTheme(color) {
    this.changeColor.emit(color);
  }
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
