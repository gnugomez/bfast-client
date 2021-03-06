import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

const OAUTH_CLIENT = environment.OAUTH_CLIENT;
const OAUTH_SECRET = environment.OAUTH_SECRET;
const API_URL = environment.API_URL;

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authEvents = new Subject<string>();

  redirectUrl = '';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  private static handleError(error: HttpErrorResponse): any {
    return throwError(() => error);
  }

  private static log(message: any): any {
    console.log(message);
  }

  login(loginData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();

    const body = new HttpParams()
      .set('username', loginData.username)
      .set('password', loginData.password)
      .set('grant_type', 'password');

    return this.http
      .post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap((res) => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  refreshToken(refreshData: any): Observable<any> {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    const body = new HttpParams()
      .set('refresh_token', refreshData.refresh_token)
      .set('grant_type', 'refresh_token');
    return this.http
      .post<any>(API_URL + 'oauth/token', body, HTTP_OPTIONS)
      .pipe(
        tap((res) => {
          this.tokenService.saveToken(res.access_token);
          this.tokenService.saveRefreshToken(res.refresh_token);
        }),
        catchError(AuthService.handleError)
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
    this.triggerEvent('logout');
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(API_URL + 'users', data).pipe(
      tap((_) => AuthService.log('register')),
      catchError(AuthService.handleError)
    );
  }

  secured(): Observable<any> {
    return this.http
      .get<any>(API_URL + 'secret')
      .pipe(catchError(AuthService.handleError));
  }

  private triggerEvent(event: string): void {
    this.authEvents.next(event);
  }

  public listenEvent(name: string, callback: CallableFunction): Subscription {
    return this.authEvents
      .pipe(
        tap((event) => {
          if (event === name) {
            callback();
          }
        })
      )
      .subscribe();
  }
}
