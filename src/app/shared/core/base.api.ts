import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {

  defUrl = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
  }

  private getUrl(url: string = '') {
    return this.defUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  public post(url: string = '', data: any): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  public put(url: string = '', data: any): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }
}
