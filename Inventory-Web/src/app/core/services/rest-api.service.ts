import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
// import { AppState } from '../core.state';
// import { selectAccessToken } from '../auth/auth.selectors';

import { environment } from '../../../environments/environment';
import { Subject, throwError } from 'rxjs';
import { AppState } from '../../store/core.state';
// import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RestApiService implements OnInit {

  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  };
  private tokenLoaded = new Subject();

  constructor(
    private httpClient: HttpClient,
    // private authService: AuthService,
    private state: Store<AppState>) { }

  get(url: string, params?: HttpParams): any {
    // this.httpOptions.params = null;
    // this.httpOptions.headers = this.authService.getHeaders();
    if (params !== null && params !== undefined) {
      this.httpOptions.params = params;
    }
    return this.httpClient.get(this.apiUrl + url, this.httpOptions);
  }

  getFile(url: string, params?: HttpParams): any {

    // let headers = this.authService.getHeaders();
    // headers.set('responseType', 'blob');
    // this.httpOptions.headers = headers;

    return this.httpClient.get(this.apiUrl + url, this.httpOptions);
  }

  getBlob(url: string): any {

    return this.httpClient.get(this.apiUrl + url, {
      // headers: this.authService.getHeaders(),
      responseType: 'blob'
    })
  }

  post(url: string, payload: any): any {
    // this.httpOptions.headers = this.authService.getHeaders();
    return this.httpClient.post(this.apiUrl + url, payload, this.httpOptions);
  }

  put(url: string, payload: any): any {
    // this.httpOptions.headers = this.authService.getHeaders();
    return this.httpClient.put(this.apiUrl + url, payload, this.httpOptions);
  }

  delete(url: string): any {
    // this.httpOptions.headers = this.authService.getHeaders();
    return this.httpClient.delete(this.apiUrl + url, this.httpOptions);

    // return null;
  }

  // postForm(url: string, payload: any): any {
  //   return this.updateHeaderFormData().pipe(
  //   mergeMap(() => {
  //     this.httpOptions.params = null;
  //     return this.httpClient.post(this.apiUrl + url, payload, this.httpOptions);
  //   }));
  // }

  // put(url: string, payload: any): any {
  //   return this.updateHeader().pipe(
  //   mergeMap(() => {
  //     this.httpOptions.params = null;
  //     return this.httpClient.put(this.apiUrl + url, payload, this.httpOptions);
  //   }));
  // }

  // putForm(url: string, payload: any): any {
  //   return this.updateHeaderFormData().pipe(
  //   mergeMap(() => {
  //     this.httpOptions.params = null;
  //     return this.httpClient.put(this.apiUrl + url, payload, this.httpOptions);
  //   }));
  // }

  // delete(url: string) {
  //   return this.updateHeader().pipe(
  //   mergeMap(() => {
  //     this.httpOptions.params = null;
  //     return this.httpClient.delete(this.apiUrl + url, this.httpOptions);
  //   }));
  // }

  ngOnInit() {}
}
