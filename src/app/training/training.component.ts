import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
  isOnGoingTraining = false;
  exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        this.isOnGoingTraining = exercise ? true : false;
      }
    );
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
