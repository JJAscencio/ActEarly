import { Baby } from 'src/models/baby.model';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BabyService {
  firestore: any;

  constructor(
    private afs: AngularFirestore,
  ) { }

  async createBaby(baby: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const babyId = this.afs.createId();

        baby.id = babyId;
        await this.afs.firestore.runTransaction(async transaction => {
          const babyRef = this.afs.doc(`babys/${babyId}`).ref;

          transaction.set(babyRef, baby);
        });
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  getBaby(babyId: string) {
    return this.afs.doc(`babys/${babyId}`).snapshotChanges().pipe(
      take(1),
      map(doc => doc.payload.data())
    );
  }

  getBabys() {
    return this.afs.collection('babys').snapshotChanges().pipe(
      map(docs => docs.map(doc => doc.payload.doc.data()))
    );
  }

  getBabysByUser(id: string) {
    return this.afs.collection('babys', ref => ref
      .where('uid', '==', id))
      .snapshotChanges()
      .pipe(
        map(docs => docs.map(doc => doc.payload.doc.data()))
      );
  }

  getBabysByUserAndPage(uid: string, last: any, pageSize: number) {
    const field = 'createdAt';
    const order = 'desc';
    if (last) {
      return this.afs.collection('babys', ref => ref
        .where('uid', '==', uid)
        .orderBy(field, order)
        .startAfter(last[field])
        .limit(pageSize))
        .snapshotChanges()
        .pipe(
          map(docs => docs.map(doc => doc.payload.doc.data()))
        );
    } else {
      return this.afs.collection('babys', ref => ref
        .where('uid', '==', uid)
        .limit(pageSize))
        .snapshotChanges()
        .pipe(
          map(docs => docs.map(doc => doc.payload.doc.data()))
        );
    }
  }

  updateBaby(bId: string, updatedBaby: any) {
    return this.afs.doc(`babys/${bId}`).update(updatedBaby);
  }

  deleteBaby(bId: string) {
    return this.afs.doc(`babys/${bId}`).delete();
  }
}
