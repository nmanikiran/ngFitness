import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material';
import { ProfileService } from './profile.service';

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
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfileComponent, DetailsComponent],
  providers: [ProfileService]
})
export class ProfileModule {}
