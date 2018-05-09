import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../router.animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiResponse} from '../interface/api-response';
import {Subject} from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../interface/auth.service';
import {UtilService} from '../interface/util.service';
import {EmailValidator} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  public isCollapsed = true;

  private _alert = new Subject<string>();
  alertMessage: string;

  redirectTo: string;
  errorResponse: ApiResponse;

  form: FormGroup;
  formErrors = {
    'email': '',
    'password': '',
    'passwordConfirmation': '',
  };
  formErrorMessages = {
    'email': {
      'required': 'Email is required!',
      'pattern': 'Should be a vaild email address!',
    },
    'password': {
      'required': 'Password is required!',
      'pattern': 'Should be minimum 8 characters of alphabet and number combination!',
    },
    'passwordConfirmation': {
      'required': 'Password Confirmation is required!',
      'match': 'Password Confirmation does not matched!', // 4
    },
  };

  buildForm(): void { // 1
    this.form = this.formBuilder.group({
      email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)]],
      passwordConfirmation: ['', [Validators.required]],
    }, {
      validator: this.customValidation, // 2
    });

    this.form.valueChanges.subscribe(data => {
      this.utilService.updateFormErrors(this.form, this.formErrors, this.formErrorMessages);
    });
  };

  customValidation(group: FormGroup) { // 3
    const password = group.get('password');
    const passwordConfirmation = group.get('passwordConfirmation');
    if (password.dirty && passwordConfirmation.dirty && password.value !== passwordConfirmation.value) {
      passwordConfirmation.setErrors({'match': true});
    }
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
  ) {
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

  onRegister() {
    this.utilService.makeFormDirtyAndUpdateErrors(this.form, this.formErrors, this.formErrorMessages);
    if (!this.form.valid) {
      this.alert('입력값을 확인해 주십시오.');
      return;
    }

    this.authService.register(this.form.value.email, this.form.value.password)
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
        console.log('this.form.value: ', this.form.value);
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
