import {Component, OnInit} from '@angular/core';
import {Block} from './block.interface';
import {Transaction} from '../transaction/transaction.interface';
import {BlockService} from '../../interface/block.service';
import {KeyService} from '../../interface/key.service';
import {TxService} from '../../interface/tx.service';
import * as CryptoJS from 'crypto-js';
import {D} from '@angular/core/src/render3';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {
  version = '02000000';
  block: Block;
  transaction: Transaction;
  index = '';
  keyList;
  address = '';
  node_number = '';
  difficultyPrefix = '0000';
  nonce = 0;
  newHash = '';
  timeout = 300; // 5 minute
  logginMode = false;

  columns_tx = [
    {name: 'From', prop: 'from', flexGlow: 3},
    {name: 'To', prop: 'to', flexGlow: 3},
    {name: 'Amount', prop: 'amount', flexGlow: 1}
  ];
  rows_tx = [];

  // https://angular.io/guide/lifecycle-hooks#onchanges


  constructor(
    private blockService: BlockService,
    private keyService: KeyService,
    private txService: TxService
  ) {}

  ngOnInit() {
    this.block = new Block({
      _id: '0', prev_hash: '0',
    });

    try {
      this.blockService.get_latest_block()
        .then(block => {
          this.block = block[0];
        })
        .catch(error => {
          console.log('error:', error);
        });
    } catch (e) {
      console.log('error: ', e.toLocaleString());
    }

    this.transaction = new Transaction({
      _id: '0',
    });

    try {
      this.node_number = localStorage.getItem('node_number');

      this.keyService.get_key_node(this.node_number)
        .then(keyList => {
          this.keyList = keyList;
          this.address = keyList[0].address;
          console.log('keyList: ', keyList);
          console.log('this.address: ', this.address);

          this.createTxList();
        })
        .catch(error => {
          console.log('error: ', error.toLocaleString());
        });
    } catch (e) {
      console.log('Exception: ', e.toLocaleString());
    }


  }

  createTxList() {
    this.rows_tx = [{
      height: -1,
      hash_pointer: ' ',
      from: ' ',
      from_node: ' ',
      to: this.address,
      to_node: this.node_number,
      amount: 50,
      created_date: Date,
    }];

    try {
      this.txService.get_tx_request()
        .then(tx => {
          this.rows_tx.push(...tx);
          this.rows_tx = [...this.rows_tx];
          console.log('tx: ', tx);
          console.log('this.rows_tx: ', this.rows_tx);
        })
        .catch(error => {
          console.log('error: ', error.toLocaleString());
        });
    } catch (e) {
      console.log('Exception: ', e.toLocaleString());
    }
  }

  validateHash(hash: string): boolean {
    return hash.indexOf(this.difficultyPrefix) === 0;
  }

  findNonce() {
    const start = Date.now();
    for (let nonce = 0, headerHash = '9999'; Date.now() - start < this.timeout * 1000 ; nonce++) {
      const headerData = [this.version, this.block.prev_hash, this.block.merkle_root, this.block.time, this.block.nbits, nonce].join('');
      headerHash = CryptoJS.SHA256(headerData).toString();
      console.log(nonce, headerHash);
      if (this.validateHash(headerHash)) {
        this.nonce = nonce;
        this.newHash = headerHash;
        break;
      }
    }
    console.log('Elapsed Time : ', (Date.now() - start) / 1000, ' sec.');
  }


  broadcast() {

  }

  reload() {

  }

  updateFilter2(event) {

  }


}
