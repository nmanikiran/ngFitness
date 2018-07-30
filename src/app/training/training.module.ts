import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current/current.component';
import { PastComponent } from './past/past.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NewComponent } from './new/new.component';
import { TrainingComponent } from './training.component';
import {
  MatTabsModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { TrainingService } from './training.service';

const routes: Routes = [{ path: '', component: TrainingComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    TrainingComponent,
    NewComponent,
    PastComponent,
    CurrentComponent
  ],
  exports: [
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [TrainingService]
})
export class TrainingModule {}
