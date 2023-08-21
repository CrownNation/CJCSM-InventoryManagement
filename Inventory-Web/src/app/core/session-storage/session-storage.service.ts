import { Injectable } from '@angular/core';

const APP_PREFIX = 'cjcsm-';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  static loadInitialState() {
    return Object.keys(sessionStorage).reduce((state: any, storageKey) => {
      if (storageKey.includes(APP_PREFIX)) {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );
        let currentStateRef = state;
        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            const item = sessionStorage.getItem(storageKey);
            currentStateRef[key] = item ? JSON.parse(item) : null;
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, {});
  }

  setItem(key: string, value: any) {
    sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string) {
    const item = sessionStorage.getItem(`${APP_PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {

    sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
