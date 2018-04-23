import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';
import {ApiResponse} from './api-response';
import {FormGroup} from '@angular/forms';

@Injectable()
export class UtilService {
  public checkSuccess(response: any): Promise<any> {
    if (response.success) return Promise.resolve(response);
    else return Promise.reject(response);
  }

  public handleApiError(error: any): Promise<any> {
    if (!environment.production) console.error('An error occurred', error);
    return Promise.reject(error);
  }

  public updateFormErrors(form: FormGroup, formErrors: any, formErrorMessages: any) { //1
    if (!form) {
      return;
    }

    for (const field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = formErrorMessages[field];
        if (messages) {
          for (const key in control.errors) {
            formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  public makeAllFormFieldsDirty(form: FormGroup) { //2
    if (!form) {
      return;
    }

    for (var field in form.controls) {
      const control = form.get(field);
      if (control) control.markAsDirty();
    }
  }

  public makeFormDirtyAndUpdateErrors(form: FormGroup, formErrors: any, formErrorMessages: any) { //3
    this.makeAllFormFieldsDirty(form);
    this.updateFormErrors(form, formErrors, formErrorMessages);
  }

  public handleFormSubmitError(response: ApiResponse, form: FormGroup, formErrors: any): void { //4
    if (response.errors) {
      for (const field in formErrors) {
        const control = form.get(field);
        if (response.errors[field] && response.errors[field].message) {
          formErrors[field] += response.errors[field].message;
        }
      }
      if (response.errors.unhandled) {
        response.message += response.errors.unhandled;
      }
    }
  }

}
