import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseService } from 'src/app/core/services/firebase-service/firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm: FormGroup;

  constructor(private firebaseService: FirebaseService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    // Initialize the form group with controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Required and valid email
      password: ['', [Validators.required, Validators.minLength(6)]] // Required and min length of 6
    });

  }

  // Sign in user
  login() {
    if (this.loginForm.invalid) {
      // If the form is invalid, do not proceed
      this.loginForm.markAllAsTouched(); // Mark all controls as touched to show validation errors
      return;
    }

    const { email, password } = this.loginForm.value;

    this.firebaseService.signIn(email, password)
      .then(() => {
        console.log('User logged in successfully');
        this.router.navigate(['/dashboard']); // Navigate to /dashboard on success
      })
      .catch((error) => {
        console.error('Error logging in:', error);
      });
  }




}
