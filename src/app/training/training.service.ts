import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './models/exercise.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any;
  private auth: any;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.auth = user;
    });
  }

  fetchAvailableExercises() {
    return this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return <Exercise>{
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((results: Exercise[]) => {
        this.availableExercises = results;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'Completed',
      authId: this.auth.uid
    });
    this.runningExercise = null;
    this.exerciseChanged.next(undefined);
  }

  cancelExercise(progress: number) {
    let { duration, calories } = this.runningExercise;
    duration = parseFloat((duration * (progress / 100)).toFixed(3));
    calories = parseFloat((calories * (progress / 100)).toFixed(3));
    this.addDataToDatabase({
      ...this.runningExercise,
      duration,
      calories,
      date: new Date(),
      state: 'Cancelled',
      authId: this.auth.uid
    });
    this.runningExercise = null;
    this.exerciseChanged.next(undefined);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelled() {
    return this.db
      .collection('finishedExercises', ref =>
        ref.where('authId', '==', this.auth.uid)
      )
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return <Exercise>{
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
