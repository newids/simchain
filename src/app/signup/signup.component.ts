import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {ApiResponse} from '../interface/api-response';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../interface/auth.service';
import {EmailValidator} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  username;
  password;
  password2;

  public isCollapsed = true;

  private _alert = new Subject<string>();
  alertMessage: string;

  redirectTo: string;
  errorResponse: ApiResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.alertMessage = '';
    this.isCollapsed = false;
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => {
      this.alertMessage = null;
      this.isCollapsed = true;
    });
    this.username = '';
    this.password = '';
    this.password2 = '';
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('node_number', '');
    localStorage.setItem('email', '');
    localStorage.setItem('currentUser', null);
  }

  onRegister() {
    // if (!this.username.validate(this.username)) {
    //   console.log(this.username.validate(this.username));
    //   this.alert('email 을 올바른 형식으로 입력해 주세요.');
    //   return;
    // }
    if (this.password || this.password2 || this.password.length < 8) {
      this.alert('password 의 길이를 8자 이상으로 입력해 주세요.');
      return;
    }
    if (this.password || this.password2 || this.password !== this.password2) {
      this.alert('password 가 일치하지 않습니다.');
      return;
    }
    this.authService.register(this.username, this.password)
      .then(data => {
        this.router.navigate([this.redirectTo ? this.redirectTo : '/main']);
        localStorage.setItem('isLoggedin', 'true');
        console.log('onLoggedin', '----------------------------');
      })
      .catch(response => {
        this.errorResponse = response;
        // this._alert.next(`Error: ${new Date()} - ${response.status} : ${response.statusText}`);
        this.alert('Error: e-mail 또는 password 를 확인해 주십시오.');
        // this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors); // 5-4
        localStorage.setItem('isLoggedin', 'false');
        localStorage.setItem('token', '');
        localStorage.setItem('node_number', '');
        localStorage.setItem('email', '');
        localStorage.setItem('currentUser', null);
        console.log('this.errorResponse: ', this.errorResponse);
        console.log('onLoggedOut', '------------');
      });
  }

  alert(msg: string) {
    this._alert.next(msg);
    this._alert.subscribe((message) => {
      this.alertMessage = message;
      this.isCollapsed = false;
    });
    debounceTime.call(this._alert, 5000).subscribe(() => {
      this.alertMessage = null;
      this.isCollapsed = true;
    });
  }
}
