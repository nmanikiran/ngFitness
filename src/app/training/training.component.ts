import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
  isOnGoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(
    private trainingService: TrainingService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        this.isOnGoingTraining = exercise ? true : false;
      },
      error => {
        this.snackbar.open(
          'Fectching exercises failed, please try again later',
          null,
          { duration: 3000 }
        );
      }
    );
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
