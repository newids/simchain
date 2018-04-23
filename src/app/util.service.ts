import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { ApiResponse } from './api-response';

@Injectable()
export class UtilService {
  public checkSuccess(response: any): Promise<any> { // 1
    if (response.success) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }

  public handleApiError(error: any): Promise<any> { // 2
    if (!environment.production) {
      console.error('An error occurred', error);
    }
    return Promise.reject(error);
  }

}
