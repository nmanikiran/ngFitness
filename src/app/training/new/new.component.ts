import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../models/exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {
  selectedValue: any;
  exercises: Exercise[] = [];
  exerciseSubscription: Subscription = new Subscription();
  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (res: Exercise[]) => {
        this.exercises = res;
      }
    );
  }
  startTraining(form: NgForm) {
    if (form.value.exercise) {
      this.trainingService.startExercise(form.value.exercise);
    }
  }
  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
