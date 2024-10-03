import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/core/services/firebase-service/firebase-service.service'; // Adjust path to your Firebase service
import { environment as env } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventory-Web';
  env: string = env.envName;
  isProd = env.production;
  version: string = env.versions.app;
  year = new Date().getFullYear();
  logo = '../../assets/TallyOneLogo.png';
  navigation = [
    { link: 'dashboard', label: 'Dashboard' },
    { link: 'pipeproperties', label: 'Pipe Properties' },
  ];
  navigationSideMenu = [...this.navigation];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // User is logged in
        console.log('User is logged in: ', user);
        // Optionally, set user data in a service or store here
      } else {
        // User is not logged in, redirect to the login page
        console.log('No user is logged in');
        this.router.navigate(['/login']);
      }
    });
  }

  // Handle logout
  onLogoutClick() {
    this.firebaseService.signOut()
      .then(() => {
        console.log('User logged out successfully');
        this.router.navigate(['/login']); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }
}
