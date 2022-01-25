import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domain/User';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;

  constructor(private http: HttpClient) {}

  public getMe(): Observable<User> {
    if (this.user) {
      return new Observable<User>((observer) => {
        observer.next(this.user);
      });
    }

    return this.http.get<User>(API_URL + 'users/me').pipe(
      tap((user: User) => {
        this.user = user;
      })
    );
  }
}
