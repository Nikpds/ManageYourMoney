import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = environment.api + 'users';
  private authUrl = environment.api + 'auth/token';

  private loggedInSubject$ = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject$.asObservable();
  jwt = new JwtHelperService();
  get loggedIn(): boolean { return this.loggedInSubject$.getValue(); }

  set loggedIn(value: boolean) { this.loggedInSubject$.next(value); }

  private isAdminInSubject$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminInSubject$.asObservable();

  private userInSubject$ = new BehaviorSubject<User>(new User());
  user$ = this.userInSubject$.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { this.loggedIn = this.isAuthanticated; this.initializeUser(this.getToken()); }

  get user(): User { return this.userInSubject$.getValue(); }

  set user(value: User) { this.userInSubject$.next(value); }

  get isAdmin(): boolean { return this.isAdminInSubject$.getValue(); }

  set isAdmin(value: boolean) { this.isAdminInSubject$.next(value); }

  getToken() {
    return localStorage.getItem('token');
  }

  get isAuthanticated() {
    return !this.jwt.isTokenExpired(this.getToken());
  }

  initializeUser(token: any) {
    if (!token) { return; }
    const info = this.jwt.decodeToken(token);
    this.user.id = info.Id;
    this.user.name = info.Name;
    this.user.lastname = info.Lastname;
    this.user.email = info.Email;
    this.isAdmin = info.Role === 'Admin' ? true : false;
  }
  login(username: string, password: string) {
    return this.http.post<any>(this.authUrl, { username: username, password: password })
      .pipe(map((data: any) => {
        const token = data['token'];
        if (token) {
          localStorage.setItem('token', token);
          this.initializeUser(token);
          this.loggedIn = true;
          return true;
        } else {
          return false;
        }
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
// const decodedToken = helper.decodeToken(myRawToken);
// const expirationDate = helper.getTokenExpirationDate(myRawToken);
// const isExpired = helper.isTokenExpired(myRawToken);
