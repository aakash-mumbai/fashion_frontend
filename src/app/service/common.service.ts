import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // tslint:disable-next-line: variable-name
  // url = 'http://localhost:4000/';
  url = 'http://ec2-18-216-122-50.us-east-2.compute.amazonaws.com:4000/';
  public _observableEmitter: any = {};
  public isAdminLoggedIn = false;
  public isSidebarOpen = false;
  path = '';

  constructor(private http: HttpClient,
              private router: Router) { }

  emitData(key: string, opts: any) {
    if (this._observableEmitter[key]) {
      this._observableEmitter[key].emit(opts);
    }
  }

  getEmitter(key: string): any {
    if (key) {
      this._observableEmitter[key] = new EventEmitter();
      return this._observableEmitter[key];
    }
  }

  postData(url, formData) {
    const baseurl = this.url + url;
    return this.http.post(baseurl, formData);
  }

  patchData(url, formData) {
    const baseurl = this.url + url;
    return this.http.patch(baseurl, formData);
  }

  getData(url) {
    const baseurl = this.url + url;
    return this.http.get(baseurl);
  }

  deleteData(url) {
    const baseurl = this.url + url;
    return this.http.delete(baseurl);
  }

  convertBase64(file: File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  }
}
