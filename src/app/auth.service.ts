// src/app/auth.service.ts

import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { UtilService } from './util.service';
import { ApiResponse } from './api-response';
import { User } from './user';

@Injectable()
export class AuthService {
  private apiBaseUrl = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private utilService: UtilService,
  ) { }

  login(username: string, password: string): Promise<any> { //1
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}/login`,{username:username, password:password})
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('token', response.data); //1-1
      })
      .catch(this.utilService.handleApiError);
  }

  me(): Promise<User> { //2
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/me`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('currentUser', JSON.stringify(response.data)); //2-1
        return response.data as User //2-2
      })
      .catch(response =>{
        this.logout(); //2-3
        return this.utilService.handleApiError(response);
      });
  }

  refresh(): Promise<any> { //3
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/refresh`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        localStorage.setItem('token', response.data); //3-1
        if(!this.getCurrentUser()) return this.me(); //3-2
      })
      .catch(response =>{
        this.logout(); //3-3
        return this.utilService.handleApiError(response);
      });
  }

  getToken(): string{ //4
    return localStorage.getItem('token');
  }

  getCurrentUser(): User{ //5
    return JSON.parse(localStorage.getItem('currentUser')) as User;
  }

  isLoggedIn(): boolean { //6
    var token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  logout(): void { //7
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}
