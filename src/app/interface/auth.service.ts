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
    const body = new URLSearchParams();
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
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('token', response.token);
        localStorage.setItem('node_number', response.node_number);
        localStorage.setItem('email', response.email);
        localStorage.setItem('nbits', '0000');
      })
      .catch(this.utilService.handleApiError);
  }

  register(username: string, password: string): Promise<any> {
    const body = new URLSearchParams();
    body.set('email', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    // return this.http.post<ApiResponse>(`${this.apiBaseUrl}/login`, {email: username, password: password})
    return this.http
      .post(`${this.apiBaseUrl}/register`, body.toString(), options)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('token', response.token);
        localStorage.setItem('node_number', response.node_number);
        localStorage.setItem('email', response.email);
        localStorage.setItem('nbits', '0000');
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
        console.log('me().catch(response) : ', response);
        return this.utilService.handleApiError(response);
      });
  }

  refresh(): Promise<any> {
    if (localStorage.getItem('isLoggedin') !== 'true') {
      return this.utilService.handleApiError('');
    }

    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/refresh`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('token', response.token);
        localStorage.setItem('node_number', response.node_number);
        localStorage.setItem('email', response.email);
        localStorage.setItem('nbits', '0000');
        if (!this.getCurrentUser()) {
          return this.me();
        }
      })
      .catch(response => {
        console.log('refresh().catch(response) : ', response);
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
    console.log('token: ', token);
    if (token) {
      console.log('!this.jwtHelper.isTokenExpired(token): ', !this.jwtHelper.isTokenExpired(token));
      // Check whether the token is expired and return
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      console.log('return false.');
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  logout(): void {
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('node_number', '');
    localStorage.setItem('email', '');
    localStorage.setItem('currentUser', null);
    this.router.navigate(['/']);
  }
}
