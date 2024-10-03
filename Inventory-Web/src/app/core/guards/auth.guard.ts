import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root' // This makes the guard available globally
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), // Only take the latest value and complete
      map(user => !!user), // Map the user object to a boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('Access denied - Redirecting to login');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
