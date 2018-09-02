import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import {
  MatCardModule,
  MatRadioModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ProfileService } from './profile.service';
import { GooglePlaceDirective } from './../google-place.directive';
import { AngularFireStorageModule } from 'angularfire2/storage';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: ':id',
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AngularFireStorageModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent, DetailsComponent, GooglePlaceDirective],
  providers: [ProfileService]
})
export class ProfileModule {}
