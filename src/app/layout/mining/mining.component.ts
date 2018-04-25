import {Component, OnInit} from '@angular/core';
import {Block} from './block.interface';
import {Transaction} from '../transaction/transaction.interface';


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

  constructor() {
  }

  ngOnInit() {
    this.block = new Block({
      _id: '0', prev_hash: '0',
    });

    this.transaction = new Transaction({
      _id: '0',
    });
  }

}
