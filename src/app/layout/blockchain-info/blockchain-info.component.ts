import {Component, OnInit, ViewChild} from '@angular/core';
import {Block} from '../mining/block.interface';
import {BlockService} from '../../interface/block.service';
import {KeyService} from '../../interface/key.service';
import {Tx} from '../../interface/tx.interface';
import {TxService} from '../../interface/tx.service';
import {DatePipe} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import {DatatableComponent} from '@swimlane/ngx-datatable';

class DateOnlyPipe extends DatePipe {
  public transform(value): any {
    return super.transform(value, 'yyyy-MM-dd hh:mm:ss');
  }
}


@Component({
  selector: 'app-blockchain-info',
  templateUrl: './blockchain-info.component.html',
  styleUrls: ['./blockchain-info.component.css']
})
export class BlockchainInfoComponent implements OnInit {
  version = '02000000';
  newBlock: Block;
  index = '';
  address = '';
  node_number = '';
  timestamp: number;
  nonce = 0;
  hash = '';
  selected = [];

  columns_blocks = [
    {name: 'Height', prop: 'height', flexGrow: 1},
    {name: 'Time', prop: 'created_date', pipe: new DateOnlyPipe('en-US'), flexGrow: 2},
    {name: 'Relayed', prop: 'node_number', flexGrow: 2},
    {name: 'Address', prop: 'address', flexGrow: 5},
  ];
  rows_blocks = [];
  blockList: Block[];

  columns_tx = [
    {name: 'From', prop: 'from', flexGrow: 3},
    {name: 'To', prop: 'to', flexGrow: 3},
    {name: 'Amount', prop: 'amount', flexGrow: 1},
    {name: 'Time', prop: 'created_date', flexGrow: 3},
  ];
  rows_tx = [];
  txList: Tx[];

  @ViewChild(DatatableComponent) table_blocks: DatatableComponent;
  @ViewChild(DatatableComponent) table_tx: DatatableComponent;

  constructor(
    private blockService: BlockService,
    private txService: TxService
  ) { }

  ngOnInit() {
    this.newBlock = new Block();

    try {
      this.blockService.get_blocks()
        .then(blocks => {
          this.blockList = [...blocks];
          this.rows_blocks = blocks;
          console.log('tx: ', blocks);
          console.log('this.rows_tx: ', this.rows_blocks);
        })
        .catch(error => {
          console.log('error:', error);
        });
    } catch (e) {
      console.log('error: ', e.toLocaleString());
    }
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log('Activate Event', event);
      this.newBlock = event.row;

      const headerData = [
        this.version,
        this.newBlock.prev_hash,
        this.newBlock.merkle_root,
        this.newBlock.time,
        this.newBlock.nbits,
        this.newBlock.nonce].join('');
      this.hash = CryptoJS.SHA256(headerData).toString();

      try {
        this.txService.get_tx_height(this.newBlock.height)
          .then(tx => {
            this.txList = [...tx];
            this.rows_tx = tx;
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
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.blockList.filter(function (d) {
      return d.address.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows_blocks = temp;
    // Whenever the filter changes, always go back to the first page
    this.table_blocks.offset = 0;
  }

  updateFilterTx(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.txList.filter(function (d) {
      return d.from.toLowerCase().indexOf(val) !== -1 || d.to.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows_tx = temp;
    // Whenever the filter changes, always go back to the first page
    this.table_tx.offset = 0;
  }

}
