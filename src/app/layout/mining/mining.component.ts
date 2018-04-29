import {Component, OnInit} from '@angular/core';
import {Block} from './block.interface';
import {Transaction} from '../transaction/transaction.interface';
import {BlockService} from '../../interface/block.service';


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


  // https://angular.io/guide/lifecycle-hooks#onchanges


  constructor(private blockService: BlockService) {
  }

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
  }

}
