import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  auth;
  constructor(
    private profileService: ProfileService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.auth = this.authService.auth;
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;

    this.profileService.getProfile(routeParams.id).subscribe(profile => {
      console.log(profile);
    });
  }
}
