import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'auth', loadChildren: '../app/auth/auth.module#AuthModule' },
  {
    path: 'training',
    loadChildren: '../app/training/training.module#TrainingModule',
    canActivate: [AuthGuard]
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
    RouterModule.forRoot(routes)
  ],
  exports: [MatSidenavModule, MatToolbarModule],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
