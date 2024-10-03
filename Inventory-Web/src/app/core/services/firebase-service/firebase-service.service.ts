import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // Observable to track the current user
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    // Get the currently logged-in user as an observable
    this.user$ = this.afAuth.authState;

     // Set persistence to local so that the user stays logged in even after page refresh
     this.afAuth.setPersistence('local')
     .then(() => {
       console.log('Persistence set to local');
     })
     .catch((error) => {
       console.error('Error setting persistence:', error);
     });
  }
  // Get Firebase JWT token
  async getFirebaseToken(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.getIdToken() : null;
  }

  // Sign up using email and password
  async signUp(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error("Error during sign-up:", error);
      throw error;
    }
  }

  // Log in using email and password
  async signIn(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  // Log out the user
  async signOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    }
  }

  // Get current user (for real-time authentication status)
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
