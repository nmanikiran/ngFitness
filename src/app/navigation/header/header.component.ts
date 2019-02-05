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
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()
  sidenavToggle = new EventEmitter();
  @Output()
  changeColor = new EventEmitter();
  isAuth = false;
  authChangeSubsciption: Subscription = new Subscription();

  colors = [{ color: 'purple' }, { color: 'pink' }];
  constructor(private auth: AuthService) {}

  changeTheme(color: string) {
    this.changeColor.emit(color);
  }
  ngOnInit() {
    this.authChangeSubsciption = this.auth.authChange.subscribe(status => {
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
