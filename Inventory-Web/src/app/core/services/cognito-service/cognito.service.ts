import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from '../../../../environments/environment'

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  // https://rodrigokamada.medium.com/authentication-using-the-amazon-cognito-to-an-angular-application-591eea4f4275

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
   }

   public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      // this.authenticationSubject.next(true);
      console.log('login success');
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      // this.authenticationSubject.next(false);
      console.log('logout success');
    });
  }

  // public isAuthenticated(): Promise<boolean> {
  //   if (this.authenticationSubject.value) {
  //     return Promise.resolve(true);
  //   } else {
  //     return this.getUser()
  //     .then((user: any) => {
  //       if (user) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }).catch(() => {
  //       return false;
  //     });
  //   }
  // }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }


}
