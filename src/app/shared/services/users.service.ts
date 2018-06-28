import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  defUrl = 'http://localhost:3000/';

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(this.defUrl + 'users/?email=' + email);
  }
}


