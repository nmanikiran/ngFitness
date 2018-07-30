import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Exercise } from '../models/exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  pastExercisesSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.pastExercisesSubscription = this.trainingService
      .fetchCompletedOrCancelled()
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    this.pastExercisesSubscription.unsubscribe();
  }
}
