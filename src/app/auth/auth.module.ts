import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
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
  exports: [RouterModule],
  declarations: [AuthComponent, SigninComponent, SignupComponent],
  providers: []
})
export class AuthModule {}
