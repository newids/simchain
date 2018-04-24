import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {routerTransition} from '../router.animations';

import {ApiResponse} from '../interface/api-response';

import {UtilService} from '../interface/util.service';
import {AuthService} from '../interface/auth.service';

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
  }

  onLoggedin() {
    this.authService.login(this.username, this.password) //5-2
      .then(data => {
        this.router.navigate([this.redirectTo ? this.redirectTo : '/main']); //5-3
        localStorage.setItem('isLoggedin', 'true');
        console.log('onLoggedin', '----------------------------');
      })
      .catch(response => {
        this.errorResponse = response;
        // this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors); //5-4
        localStorage.removeItem('isLoggedin');
        console.log('onLoggedOut', '------------');
      });
    // TODO: make login process
    // email & password was empty...
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWRlMThmOGRiYWIzMjQxMzY4NmQ4OTYiLCJub2RlX251bWJlciI6Ijg5IiwiZXhwIjoxNTI1MTA5NjI0LCJpYXQiOjE1MjQ1MDQ4MjR9.NbhySnpyoJGax1tvCKEjBiKMPedMlGPPvYUTq3PX-SI
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWRlMTk4ZTk2NDFlZDQxODI5MGU5NzIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJub2RlX251bWJlciI6IjUyNiIsImV4cCI6MTUyNTEwOTc3NCwiaWF0IjoxNTI0NTA0OTc0fQ.ZG7zUmyACw6HztrM5Uhl56JuzwZr9nWuVo9zbGOaKcw
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWRlMTk4ZTk2NDFlZDQxODI5MGU5NzIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJub2RlX251bWJlciI6IjUyNiIsImV4cCI6MTUyNTExMDAzMiwiaWF0IjoxNTI0NTA1MjMyfQ.WjB21WatdfrAQoAO2q7x37J2K0KoO7DQ9ayi-dX5NfI
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWRlMWI0NDk2NDFlZDQxODI5MGU5NzMiLCJlbWFpbCI6IiIsIm5vZGVfbnVtYmVyIjoiNjQ1NiIsImV4cCI6MTUyNTExMDIxMiwiaWF0IjoxNTI0NTA1NDEyfQ.Z57JbdKiwR5p2FF9MKBn44kFz4USZx38HdqQkB4aLIw
  }

  // submit() {
  //   this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages); //5-1
  //   if (this.form.valid) {
  //     this.authService.login(this.form.value.username, this.form.value.password) //5-2
  //       .then(data => {
  //         this.router.navigate([this.redirectTo ? this.redirectTo : '/']); //5-3
  //       })
  //       .catch(response => {
  //         this.errorResponse = response;
  //         this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors); //5-4
  //       });
  //   }
  // }

}
