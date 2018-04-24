// src/app/auth.service.ts

import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import 'rxjs/add/operator/toPromise';

import {UtilService} from './util.service';
import {ApiResponse} from './api-response';
import {User} from './user.interface';
import {b} from '@angular/core/src/render3';

@Injectable()
export class AuthService {
  private apiBaseUrl = `${environment.apiBaseUrl}/user`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService,
    public jwtHelper: JwtHelperService,
  ) {
  }

  login(username: string, password: string): Promise<any> {
    let body = new URLSearchParams();
    body.set('email', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    // return this.http.post<ApiResponse>(`${this.apiBaseUrl}/login`, {email: username, password: password})
    return this.http
      .post(`${this.apiBaseUrl}/login`, body.toString(), options)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('node_number', response.node_number);
        localStorage.setItem('email', response.email);
      })
      .catch(this.utilService.handleApiError);
  }

  me(): Promise<User> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/me`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        return response.data as User;
      })
      .catch(response => {
        this.logout();
        return this.utilService.handleApiError(response);
      });
  }

  refresh(): Promise<any> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/refresh`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('node_number', response.node_number);
        localStorage.setItem('email', response.email);
        if (!this.getCurrentUser()) {
          return this.me();
        }
      })
      .catch(response => {
        this.logout();
        return this.utilService.handleApiError(response);
      });
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
    // return (token ? true : false);
    // if (token) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('node_number');
    localStorage.removeItem('email');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
