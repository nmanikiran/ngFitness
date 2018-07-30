import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../models/exercise.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  selectedValue: any;
  items: Exercise[];
  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.items = this.trainingService.getAvailableExercises();
  }
  startTraining() {
    console.log(this.selectedValue);
    this.trainingService.startExercise(this.selectedValue);
  }
}
