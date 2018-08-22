import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './navigation/header/header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from './../environments/environment';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'auth', loadChildren: '../app/auth/auth.module#AuthModule' },
  {
    path: 'training',
    loadChildren: '../app/training/training.module#TrainingModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: '../app/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    RouterModule.forRoot(routes)
  ],
  exports: [MatSidenavModule, MatToolbarModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
