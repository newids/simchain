import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import {environment} from '../../environments/environment';
import {UtilService} from './util.service';
import {ApiResponse} from './api-response';

import {Tx} from './tx.interface';
import {address} from 'bitcoinjs-lib';
import {Block} from '../layout/mining/block.interface';

@Injectable()
export class BlockService {
  private apiBaseUrl = `${environment.apiBaseUrl}/block`;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
  ) {}

  create_a_block(block: Block): Promise<string> {
    return this.http.post<ApiResponse>(`${this.apiBaseUrl}`, block)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  get_blocks(): Promise<Block[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  get_latest_block(): Promise<Block[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/latest`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Block;
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
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  get_block_height(height: number): Promise<Block[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/height/${height}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  get_block_node(node_number: string): Promise<Block[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/node/${node_number}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        console.log('response:', response);
        console.log('response.data', response.data);
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  index(): Promise<Block[]> {
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Block[];
      })
      .catch(this.utilService.handleApiError);
  }

  update(blockname: string, block: Block): Promise<Block> {
    return this.http.put<ApiResponse>(`${this.apiBaseUrl}/${blockname}`, block)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }

  destroy(blockname: string): Promise<Block> {
    return this.http.delete<ApiResponse>(`${this.apiBaseUrl}/${blockname}`)
      .toPromise()
      .then(this.utilService.checkSuccess)
      .then(response => {
        return response.data as Block;
      })
      .catch(this.utilService.handleApiError);
  }
}
