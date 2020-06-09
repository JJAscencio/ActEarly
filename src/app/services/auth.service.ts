import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afa:AngularFireAuth ,
    private userService: UserService) {
    this.user$ = this.afa.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }

  login(email: string, password: string): Promise<any> {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): Promise<any> {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afa.auth.signOut();
  }

  // deleteUser() {
  //   const user = firebase.auth().currentUser;
  //   user.delete();
  // }
}
