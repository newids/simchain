import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';
import {UtilService} from './util.service';
import {ApiResponse} from './api-response';

import {Tx} from './tx.interface';
import {address} from 'bitcoinjs-lib';

@Injectable()
export class TxService {
  private apiBaseUrl = `${environment.apiBaseUrl}/tx`;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  create_tx_request(tx: Tx): Promise<Tx> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}/requests`, tx)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Tx;
      })
      .catch(this.utilService.handleApiError);
  }

  get_address_balance(from_address: string): Promise<string> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/balance/${from_address}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data;
      })
      .catch(this.utilService.handleApiError);
  }

  get_tx_request(): Promise<Tx[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/requests`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Tx[];
      })
      .catch(this.utilService.handleApiError);
  }

  get_tx_height(height: number): Promise<Tx[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/height/${height}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Tx[];
      })
      .catch(this.utilService.handleApiError);
  }

  get_tx_node(node_number: string): Promise<Tx[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/node/${node_number}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Tx[];
      })
      .catch(this.utilService.handleApiError);
  }

  index(): Promise<Tx[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Tx[];
      })
      .catch(this.utilService.handleApiError);
  }

  update(txname: string, tx: Tx): Promise<Tx> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/${txname}`, tx)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Tx;
      })
      .catch(this.utilService.handleApiError);
  }

  destroy(txname: string): Promise<Tx> {
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/${txname}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Tx;
      })
      .catch(this.utilService.handleApiError);
  }
}
