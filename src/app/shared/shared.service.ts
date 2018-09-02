import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  constructor() {}
  getCookie(name: any) {
    if (name) {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    } else {
      return null;
    }
  }
  setCookie(name: any, value: any, days: number) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toUTCString();
  }
  deleteCookie(name: any) {
    if (name) {
      this.setCookie(name, '', -1);
    }
  }
}
