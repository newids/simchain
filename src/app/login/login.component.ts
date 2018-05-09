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
  public isCollapsed = true;

  private _alert = new Subject<string>();
  alertMessage: string;

  redirectTo: string;
  errorResponse: ApiResponse;
  form: FormGroup;
  formErrors = {
    'email': '',
    'password': '',
  };
  formErrorMessages = {
    'email': {
      'required': 'Username is required!',
      'pattern': 'Should be a vaild email address!',
    },
    'password': {
      'required': 'Password is required!',
      'pattern': 'Should be minimum 8 characters of alphabet and number combination!',
    },
  };

  buildForm(): void { // 4
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  }
  // this._alert.next(`Error: ${new Date()} - ${e.toLocaleString()}`);
  // this.alert();
  // alert() {
    // this._alert.subscribe((message) => this.alertMessage = message);
    // debounceTime.call(this._alert, 5000).subscribe(() => this.alertMessage = null);
  // }

  constructor(
    private router: Router,
    // private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private authService: AuthService,
  ) {
    // this.buildForm();
    this.redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
    this.buildForm();
  }

  ngOnInit() {
    this.alert('');
    // this.alertMessage = '';
    // this.isCollapsed = false;
    // this._alert.subscribe((message) => this.alertMessage = message);
    // debounceTime.call(this._alert, 5000).subscribe(() => {
    //   this.alertMessage = null;
    //   this.isCollapsed = true;
    // });
    localStorage.setItem('isLoggedin', 'false');
    localStorage.setItem('token', '');
    localStorage.setItem('node_number', '');
    localStorage.setItem('email', '');
    localStorage.setItem('currentUser', null);
  }

  onLoggedin() {
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if (!this.form.valid) {
      this.alert('입력값을 확인해 주십시오.');
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password)
      .then(data => {
        this.router.navigate([this.redirectTo ? this.redirectTo : '/main']);
        localStorage.setItem('isLoggedin', 'true');
        console.log('onLoggedin', '----------------------------');
      })
      .catch(response => {
        this.errorResponse = response;
        this.utilService.handleFormSubmitError(this.errorResponse, this.form, this.formErrors); // 5-4
        // this._alert.next(`Error: ${new Date()} - ${response.status} : ${response.statusText}`);
        this.alert('Error: e-mail 또는 password 를 확인해 주십시오.');
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
