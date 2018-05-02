import {Component, OnInit} from '@angular/core';
import {Block} from './block.interface';
import {Transaction} from '../transaction/transaction.interface';
import {BlockService} from '../../interface/block.service';
import {KeyService} from '../../interface/key.service';
import {TxService} from '../../interface/tx.service';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {

  block: Block;
  transaction: Transaction;
  index = '';
  timestamp = '';
  address = '';

  columns_tx = [
    {prop: 'number'},
    {name: 'from'},
    {name: 'to'},
    {name: 'amount'},
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

    this.rows_tx = [{
      height: -1,
      hash_pointer: '',
      from: '',
      from_node: '',
      to: this.address,
      to_node: localStorage.getItem('node_number'),
      amount: 50,
      created_date: Date,
    }];

    try {
      this.txService.get_tx_request()
        .then(tx => {
          this.rows_tx.push(tx);
        })
        .catch(error => {
          console.log('error: ', error.toLocaleString());
        });
    }
    catch (e) {
      console.log('Exception: ', e.toLocaleString());
    }
  }

}
