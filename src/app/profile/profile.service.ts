import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Profile } from './models/profile';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  private auth: any;
  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.auth = user;
    });
  }

  getProfile(id): Observable<Profile[]> {
    return this.db
      .collection('profile', ref => ref.where('authId', '==', id))
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return <Profile>{
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      );
  }
  updateProfile(id, profile) {
    this.db.doc(`profile/${id}`).update(profile);
  }
  addProfile(profile) {
    this.db.collection('profile').add(profile);
  }
}
