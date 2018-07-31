import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  progress = 0;
  timer;
  isInProgress = false;
  constructor(
    public snackBar: MatSnackBar,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.isInProgress = true;
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    const message = `Are you sure, you want to stop ? \n you already got ${
      this.progress
    } %`;
    if (confirm(message)) {
      this.isInProgress = false;
      this.trainingService.cancelExercise(this.progress);
    } else {
      this.startOrResumeTimer();
    }
  }
  onPause() {
    if (this.isInProgress) {
      this.isInProgress = false;
      clearInterval(this.timer);
      this.snackBar.open('Exercise pasued', '', { duration: 1000 });
    } else {
      this.isInProgress = true;
      this.snackBar.open('Exercise resumed', '', { duration: 1000 });
      this.startOrResumeTimer();
    }
  }
}
