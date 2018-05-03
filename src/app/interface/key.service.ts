import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';
import {UtilService} from './util.service';
import {ApiResponse} from './api-response';

import {Key} from './key.interface';

@Injectable()
export class KeyService {
  private apiBaseUrl = `${environment.apiBaseUrl}/key`;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {
  }

  get_key_node(node_number: string): Promise<Key[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/node/${node_number}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Key[];
      })
      .catch(this.utilService.handleApiError);
  }

  get_address_node(node_number: string): Promise<string> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/wnode/${node_number}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data;
      })
      .catch(this.utilService.handleApiError);
  }

  create(key: Key): Promise<Key> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`, key)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Key;
      })
      .catch(this.utilService.handleApiError);
  }

  update(keyname: string, key: Key): Promise<Key> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/${keyname}`, key)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Key;
      })
      .catch(this.utilService.handleApiError);
  }

  destroy(keyname: string): Promise<Key> {
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/${keyname}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Key;
      })
      .catch(this.utilService.handleApiError);
  }
}
