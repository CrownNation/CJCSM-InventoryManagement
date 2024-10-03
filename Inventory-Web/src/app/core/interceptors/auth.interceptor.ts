import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../services/firebase-service/firebase-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: FirebaseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Return the modified request with the token
    return from(this.authService.getFirebaseToken()).pipe(
      switchMap(token => {
        if (token) {
          const cloned = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
          console.log('Request with token:', cloned);
          return next.handle(cloned);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}