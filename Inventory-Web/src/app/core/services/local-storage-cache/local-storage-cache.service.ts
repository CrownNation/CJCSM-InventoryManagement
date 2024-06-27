import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageCacheService {

  constructor() { }

  saveToLocalStorage(key: string, data: any): void {
    const item = {
      value: data,
      timestamp: new Date().getTime(), // Store the current timestamp
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  getFromLocalStorage(key: string, durationInMilliseconds: number = 604800000): any { // Default duration: 1 week
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    if (now > (item.timestamp + durationInMilliseconds)) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
}
