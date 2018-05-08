import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {routerTransition} from '../router.animations';

import {ApiResponse} from '../interface/api-response';

import {UtilService} from '../interface/util.service';
import {AuthService} from '../interface/auth.service';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';

// IF ERROR: Can't bind to 'ngModel' since it isn't a known property of 'input'
// ---> ADD FormsModule at ***.module.ts :::  import { FormsModule } from '@angular/forms';
// https://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  username;
  password;

  redirectTo: string;
  errorResponse: ApiResponse;
  // form: FormGroup;
  // formErrors = {
  //   'username': '',
  //   'password': '',
  // };
  // formErrorMessages = {
  //   'username': {
  //     'required': 'Username is required!',
  //   },
  //   'password': {
  //     'required': 'Password is required!',
  //   },
  // };
  //
  // buildForm(): void { //4
  //   this.form = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required],
  //   });
  //
  //   this.form.valueChanges.subscribe(data => {
  //     this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
  //   });
  // };
  public isCollapsed = true;

  private _alert = new Subject<string>();
  alertMessage: string;
  // this._alert.next(`Error: ${new Date()} - ${e.toLocaleString()}`);
  // this.alert();
  alert() {
    // this._alert.subscribe((message) => this.alertMessage = message);
    // debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  }

  constructor(
    private router: Router,
    // private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private authService: AuthService,
  ) {
    // this.buildForm();
    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
  }

  ngOnInit() {
    // this.alertMessage = '';
    // this._alert.next('');
    // this.alert();
    // this._alert.next(null);
    this.alertMessage = '';
    this.isCollapsed = false;
    this._alert.subscribe((message) => this.alertMessage = message);
    debounceTime.call(this._alert, 5000).subscribe(() => {
      this.alertMessage = null;
      this.isCollapsed = true;
    });
    this.username = '';
    this.password = '';
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('node_number', '');
    localStorage.setItem('email', '');
    localStorage.setItem('currentUser', null);
  }

  onLoggedin() {
    this.authService.login(this.username, this.password)
      .then(data => {
        this.router.navigate([this.redirectTo ? this.redirectTo : '/main']);
        localStorage.setItem('isLoggedin', 'true');
        console.log('onLoggedin', '----------------------------');
      })
      .catch(response => {
        this.errorResponse = response;
        // this._alert.next(`Error: ${new Date()} - ${response.status} : ${response.statusText}`);
        this._alert.next('Error: e-mail 또는 password 를 확인해 주십시오.');
        this._alert.subscribe((message) => {
          this.alertMessage = message;
          this.isCollapsed = false;
        });
        debounceTime.call(this._alert, 5000).subscribe(() => {
          this.alertMessage = null;
          this.isCollapsed = true;
        });
        localStorage.setItem('isLoggedin', 'false');
        localStorage.setItem('token', '');
        localStorage.setItem('node_number', '');
        localStorage.setItem('email', '');
        localStorage.setItem('currentUser', null);
        console.log('this.errorResponse: ', this.errorResponse);
        console.log('onLoggedOut', '------------');
      });
  }

}
