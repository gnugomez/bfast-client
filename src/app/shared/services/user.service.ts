import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../domain/User';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user?: User;

  constructor(private http: HttpClient, private authService: AuthService, private tokenService: TokenService) {
    this.authService.listenEvent('logout', () => {
      this.clearUser();
    });
  }

  public getMe(
    params: { forceFetch: boolean } = { forceFetch: false }
  ): Observable<User> {
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

  isUserLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      if (!this.tokenService.getToken()) {
        observer.next(false);
      } else {
        this.getMe().subscribe((user: User) => {
          observer.next(true);
        });
      }
    })
  }

  public clearUser(): void {
    this.user = undefined;
  }
}
